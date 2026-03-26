"use client";

import { useState } from "react";
import { Card, Row, Col, Modal, Input, Form, Spin, App, Typography, Tag, Select, Radio } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useClientsQuery, useDeleteClientsMutation, useUpdateClientsMutation } from "@/app/hooks/api/api";
import { IClient } from "@/app/types/types";

const { Title, Text } = Typography;
const { confirm } = Modal;

const UserName = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm<IClient>();

  const { data: users, isLoading, isError } = useClientsQuery(undefined);
  const [deleteClient] = useDeleteClientsMutation();
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientsMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<IClient | null>(null);

  const clients: IClient[] = users?.data || [];

  const showEditModal = (user: IClient) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleUpdate = async () => {
    try {
      if (!editingUser) return;
      
      const values = await form.validateFields();

      if (values.password === values.username) {
        return message.error("Password and Username cannot be the same");
      }
    

      await updateClient({
        id: editingUser._id,
        data: values, 
      }).unwrap();

      message.success("Updated Successfully");
      handleCancel();
    } catch  {
      message.error("Update failed");
    }
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: 'Are you sure delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      centered: true,
      onOk: async () => {
        try {
          await deleteClient(id).unwrap();
          message.success("User Deleted Successfully");
        } catch {
          message.error("Delete failed");
        }
      },
    });
  };

  if (isLoading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Spin size="large" description="Loading Users..." />
    </div>
  );

  if (isError) return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Text type="danger">Failed to load users. Please check your connection.</Text>
    </div>
  );

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ marginBottom: 24 }}><UserOutlined /> Client Management</Title>
      
      <Row gutter={[16, 16]}>
        {clients.map((user) => (
          <Col key={user._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              title={user.username}
              extra={<Tag color="blue">{user.category}</Tag>}
              actions={[
                <EditOutlined key="edit" style={{ color: "#1890ff" }} onClick={() => showEditModal(user)} />,
                <DeleteOutlined key="delete" style={{ color: "#ff4d4f" }} onClick={() => showDeleteConfirm(user._id)} />,
              ]}
            >
              <div style={{ lineHeight: '2' }}>
                <p><strong>Password:</strong> {user.password}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Site:</strong> <Tag color="green">{user.sitename}</Tag></p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Update User Details"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
        confirmLoading={isUpdating}
        destroyOnHidden// This helps clear the warning
        okText="Update"
      >
        {/* ✅ Using initialValues and a unique Key fix the connection error */}
        <Form 
          key={editingUser?._id} 
          form={form} 
          layout="vertical" 
          initialValues={editingUser || {}}
        >
          <Form.Item 
            label="Username" 
            name="username" 
            rules={[{ required: true, message: 'Username is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="Select Website" name="sitename">
            <Select>
              <Select.Option value="bajilive">Bajilive</Select.Option>
              <Select.Option value="crickex">Crickex</Select.Option>
              <Select.Option value="jeetbuzz">Jeetbuzz</Select.Option>
              <Select.Option value="khelagor">Khelagor</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Radio.Group>
              <Radio value="user">User ID</Radio>
              <Radio value="affiliate">Affiliate ID</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item 
            label="Password" 
            name="password" 
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserName;