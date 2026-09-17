"use client";
import React from "react";
import { App, Button, Form, Input, Typography } from "antd";
import { LockOutlined, RocketOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/app/hooks/api/api";

const { Text } = Typography;

const Login = () => {
  const { message } = App.useApp();
  const [login, { isLoading }] = useLoginMutation();
  const [form] = Form.useForm<{ userId: string }>();
  const router = useRouter();

  const onFinish = async (values: { userId: string }) => {
    try {
      await login({ userId: values.userId }).unwrap();
      router.push("/username");
      message.success("Login Successful!");
      form.resetFields();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message.error(error.data?.message || "Invalid User ID!");
    }
  };

  return (
    <Form
      form={form}
      name="loginForm"
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      size="large"
    >
      <Form.Item
        name="userId"
        label={<Text style={{ color: "#CBD5E1", fontWeight: 500 }}>User ID</Text>}
        rules={[{ required: true, message: "Please enter your User ID!" }]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "#64748B" }} />}
          placeholder="Enter your User ID"
          autoComplete="current-password"
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        loading={isLoading}
        icon={!isLoading ? <RocketOutlined /> : undefined}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <div style={{ textAlign: "center", marginTop: 12 }}>
        <Text style={{ color: "#64748B", fontSize: 13 }}>
          Secure access · Protected dashboard
        </Text>
      </div>
    </Form>
  );
};

export default Login;