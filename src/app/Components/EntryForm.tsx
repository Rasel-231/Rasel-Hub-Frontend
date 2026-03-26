"use client";

import React from "react";
import { App, Button, Form, Input, Radio, Select, Space, Typography } from "antd";
import { useCreateClientsMutation } from "../hooks/api/api";

const { Title } = Typography;

interface RTKQueryError {
  status: number | string;
  data?: {
    success?: boolean;
    message?: string;
    errorSources?: Array<{
      path: string | number;
      message: string;
    }>;
  };
}

interface ClientFormValues {
  username: string;
  password: string;
  phone: string;
  sitename: "bajilive" | "crickex" | "jeetbuzz" | "khelagor" | "others";
  category: "user" | "affiliate";
}

const EntryForm: React.FC = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [createClient, { isLoading }] = useCreateClientsMutation();

  const handleCreateClients = async (values: ClientFormValues) => {
    try {
      const payload = {
        ...values,
        phone: String(values.phone),
      };

      await createClient(payload).unwrap();
      
      message.success("Client created Successfully");
      form.resetFields();
    } catch (err: unknown) {
      const error = err as RTKQueryError;

      if (error.data?.message) {
        message.error(error.data.message);
      } else if (error.status === 'FETCH_ERROR') {
        message.error("Network error! Server might be down.");
      } else {
        message.error("Client creation failed. Please try again.");
      }
      
      console.error("Submission Error:", error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: "20px" }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ sitename: "bajilive", category: "user" }}
        onFinish={handleCreateClients}
      >
        <Title level={2}>USER ENTRY FORM</Title>

        <Form.Item
          name="username"
          label="User Name"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Phone is required" },
            { pattern: /^\d{11}$/, message: "Must be exactly 11 digits" }
          ]}
        >
          <Input placeholder="017XXXXXXXX" maxLength={11} />
        </Form.Item>

        <Form.Item 
          name="sitename" 
          label="Select Website" 
          rules={[{ required: true, message: "Please select a website" }]}
        >
          <Select placeholder="Select a website">
            <Select.Option value="bajilive">Bajilive</Select.Option>
            <Select.Option value="crickex">Crickex</Select.Option>
            <Select.Option value="jeetbuzz">Jeetbuzz</Select.Option>
            <Select.Option value="khelagor">Khelagor</Select.Option>
            <Select.Option value="others">Others</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item 
          name="category" 
          label="Category" 
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Radio.Group>
            <Radio value="user">User ID</Radio>
            <Radio value="affiliate">Affiliate ID</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EntryForm;