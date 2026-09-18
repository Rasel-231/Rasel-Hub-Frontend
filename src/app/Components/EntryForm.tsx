"use client";

import React from "react";
import {
  App,
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import {
  LockOutlined,
  PhoneOutlined,
  RocketOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useCreateClientsMutation } from "../hooks/api/api";

const { Title, Text } = Typography;

interface RTKQueryError {
  status: number | string;
  data?: {
    success?: boolean;
    message?: string;
  };
}

interface ClientFormValues {
  username: string;
  password: string;
  phone: string;
  sitename: string;
  category: "user" | "affiliate";
}

const siteOptions = [
  { value: "bajilive", label: "Bajilive" },
  { value: "crickex", label: "Crickex" },
  { value: "jeetbuzz", label: "Jeetbuzz" },
  { value: "khelagor", label: "Khelagor" },
  { value: "others", label: "Others" },
];

const EntryForm: React.FC = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [createClient, { isLoading }] = useCreateClientsMutation();

  const handleCreateClients = async (values: ClientFormValues) => {
    try {
      await createClient({ ...values, phone: String(values.phone) }).unwrap();
      message.success("Client created successfully");
      form.resetFields();
    } catch (err: unknown) {
      const error = err as RTKQueryError;
      if (error.data?.message) {
        message.error(error.data.message);
      } else if (error.status === "FETCH_ERROR") {
        message.error("Network error! Server might be down.");
      } else {
        message.error("Client creation failed. Please try again.");
      }
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 0" }}>
      <Card
        style={{ borderRadius: 18, border: "1px solid #E9EEF5" }}
        styles={{ body: { padding: "28px 24px" } }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 56,
              height: 56,
              margin: "0 auto 12px",
              borderRadius: 16,
              background: "linear-gradient(135deg, #EEF2FF, #E0F2FE)",
              color: "#4F46E5",
              fontSize: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RocketOutlined />
          </div>
          <Title level={3} style={{ margin: 0, fontWeight: 800 }}>
            Create New Entry
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Register a new client account in one go
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          initialValues={{ sitename: undefined, category: "user" }}
          onFinish={handleCreateClients}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input prefix={<UserOutlined style={{ color: "#94A3B8" }} />} placeholder="Enter username" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Password is required" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#94A3B8" }} />}
                  placeholder="Enter password"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: "Phone is required" },
                  { pattern: /^\d{11}$/, message: "Must be exactly 11 digits" },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined style={{ color: "#94A3B8" }} />}
                  placeholder="017XXXXXXXX"
                  maxLength={11}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="sitename"
                label="Select Website"
                rules={[{ required: true, message: "Please select a website" }]}
              >
                <Select placeholder="Select a website" options={siteOptions} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select a category" }]}
              >
                <Radio.Group
                  optionType="button"
                  buttonStyle="solid"
                  options={[
                    { value: "user", label: "User ID" },
                    { value: "affiliate", label: "Affiliate ID" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0 }}>
            <Space size={12} wrap>
              <Button type="primary" htmlType="submit" loading={isLoading} icon={<RocketOutlined />}>
                {isLoading ? "Creating..." : "Create Client"}
              </Button>
              <Button onClick={() => form.resetFields()}>Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EntryForm;