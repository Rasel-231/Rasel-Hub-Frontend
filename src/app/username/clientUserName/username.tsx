"use client";

import { useState } from "react";
import {
  App,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Modal,
  Radio,
  Result,
  Row,
  Select,
  Skeleton,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PhoneOutlined,
  ReloadOutlined,
  TeamOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useClientsQuery, useDeleteClientsMutation, useUpdateClientsMutation } from "@/app/hooks/api/api";
import { IClient } from "@/app/types/types";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { confirm } = Modal;

const siteTagColor: Record<string, string> = {
  bajilive: "green",
  crickex: "blue",
  jeetbuzz: "orange",
  khelagor: "purple",
  others: "default",
};

const siteOptions = [
  { value: "bajilive", label: "Bajilive" },
  { value: "crickex", label: "Crickex" },
  { value: "jeetbuzz", label: "Jeetbuzz" },
  { value: "khelagor", label: "Khelagor" },
  { value: "others", label: "Others" },
];

const UserName = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm<IClient>();

  const { data: users, isLoading, isError, isFetching, refetch } = useClientsQuery(undefined);
  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientsMutation();
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientsMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<IClient | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const clients: IClient[] = users?.data || [];
  const total = clients.length;
  const userCount = clients.filter((c) => c.category === "user").length;
  const affiliateCount = clients.filter((c) => c.category === "affiliate").length;

  const toggleReveal = (id: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
      await updateClient({ id: editingUser._id, data: values }).unwrap();
      message.success("Client updated successfully");
      handleCancel();
    } catch {
      message.error("Update failed");
    }
  };

  const showDeleteConfirm = (user: IClient) => {
    confirm({
      title: "Delete this client?",
      icon: <ExclamationCircleOutlined />,
      content: `${user.username} will be permanently removed. This cannot be undone.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      okButtonProps: { loading: isDeleting && deletingId === user._id },
      onOk: async () => {
        setDeletingId(user._id);
        try {
          await deleteClient(user._id).unwrap();
          message.success("Client deleted successfully");
        } catch {
          message.error("Delete failed");
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <div>
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          {[1, 2, 3].map((n) => (
            <Col xs={24} sm={8} key={n}>
              <Card>
                <Skeleton active paragraph={{ rows: 1 }} />
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={[16, 16]}>
          {[1, 2, 3, 4].map((n) => (
            <Col xs={24} sm={12} md={8} lg={6} key={n}>
              <Card>
                <Skeleton active avatar paragraph={{ rows: 3 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  /* ---------------- Error ---------------- */
  if (isError) {
    return (
      <Result
        status="warning"
        title="Failed to load clients"
        subTitle="Please check your connection and try again."
        extra={
          <Button type="primary" icon={<ReloadOutlined />} onClick={() => refetch()}>
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 4px" }}>
      {/* Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={8}>
          <Card style={{ borderRadius: 14 }}>
            <Statistic title="Total Clients" value={total} prefix={<TeamOutlined style={{ color: "#4F46E5" }} />} />
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card style={{ borderRadius: 14 }}>
            <Statistic title="User IDs" value={userCount} valueStyle={{ color: "#06B6D4" }} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card style={{ borderRadius: 14 }}>
            <Statistic title="Affiliate IDs" value={affiliateCount} valueStyle={{ color: "#10B981" }} prefix={<UsergroupAddOutlined />} />
          </Card>
        </Col>
      </Row>

      {/* Header + refresh */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <Title level={4} style={{ margin: 0, fontWeight: 800 }}>
          <UserOutlined /> Client Management
        </Title>
        <Button icon={<ReloadOutlined />} onClick={() => refetch()} loading={isFetching}>
          Refresh
        </Button>
      </div>

      {/* Cards */}
      {clients.length === 0 ? (
        <Empty description="No clients found yet — create your first entry." style={{ padding: "40px 0" }} />
      ) : (
        <Row gutter={[16, 16]}>
          {clients.map((user) => (
            <Col key={user._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ height: "100%", borderRadius: 16, border: "1px solid #E9EEF5" }}
                title={
                  <Space align="center" size={8} style={{ width: "100%", justifyContent: "space-between" }}>
                    <Text strong ellipsis style={{ maxWidth: 120 }}>
                      {user.username}
                    </Text>
                    <Tag color={user.category === "user" ? "blue" : "purple"} style={{ marginInlineEnd: 0 }}>
                      {user.category}
                    </Tag>
                  </Space>
                }
                actions={[
                  <EditOutlined
                    key="edit"
                    style={{ color: "#4F46E5", fontSize: 16 }}
                    onClick={() => showEditModal(user)}
                  />,
                  <DeleteOutlined
                    key="delete"
                    style={{ color: "#EF4444", fontSize: 16 }}
                    onClick={() => showDeleteConfirm(user)}
                  />,
                ]}
              >
                <div style={{ lineHeight: "2.1" }}>
                  <p style={{ margin: 0 }}>
                    <Text type="secondary" style={{ display: "inline-block", width: 70 }}>
                      Site:
                    </Text>
                    <Tag color={siteTagColor[user.sitename] ?? "default"}>{user.sitename}</Tag>
                  </p>
                  <p style={{ margin: 0 }}>
                    <Text type="secondary" style={{ display: "inline-block", width: 70 }}>
                      Phone:
                    </Text>
                    <Text style={{ fontSize: 13 }}>{user.phone}</Text>
                  </p>
                  <p style={{ margin: 0 }}>
                    <Text type="secondary" style={{ display: "inline-block", width: 70 }}>
                      Pass:
                    </Text>
                    <Space size={6}>
                      <Text style={{ fontSize: 13, letterSpacing: "0.08em" }}>
                        {revealed.has(user._id) ? user.password : "••••••••"}
                      </Text>
                      <Button
                        type="text"
                        size="small"
                        style={{ padding: 0, height: "auto", color: "#94A3B8" }}
                        icon={revealed.has(user._id) ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => toggleReveal(user._id)}
                      />
                    </Space>
                  </p>
                  {user.createdAt && (
                    <p style={{ margin: 0 }}>
                      <Text type="secondary" style={{ display: "inline-block", width: 70 }}>
                        Joined:
                      </Text>
                      <Text style={{ fontSize: 12, color: "#64748B" }}>
                        {dayjs(user.createdAt).format("MMM D, YYYY")}
                      </Text>
                    </p>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Edit modal */}
      <Modal
        title="Update Client Details"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
        confirmLoading={isUpdating}
        okText="Update"
        cancelText="Cancel"
        centered
        destroyOnHidden
      >
        <Form
          key={editingUser?._id}
          form={form}
          layout="vertical"
          initialValues={editingUser || {}}
          requiredMark={false}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input prefix={<UserOutlined style={{ color: "#94A3B8" }} />} />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input prefix={<PhoneOutlined style={{ color: "#94A3B8" }} />} />
          </Form.Item>

          <Form.Item label="Select Website" name="sitename">
            <Select options={siteOptions} />
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Radio.Group
              optionType="button"
              options={[
                { value: "user", label: "User ID" },
                { value: "affiliate", label: "Affiliate ID" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password prefix={<EyeInvisibleOutlined style={{ color: "#94A3B8" }} />} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserName;