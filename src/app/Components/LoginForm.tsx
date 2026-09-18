"use client";
import React from "react";
import { App, Button, Form, Input, Typography } from "antd";
import { LockOutlined, RocketOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/app/hooks/api/api";
import { setSession } from "@/app/lib/session";

const { Text } = Typography;

type LoginFormProps = {
  /** Where to go after a successful login. */
  redirectTo?: string;
  /** Show labels in light/dark contexts. Defaults to light text (dark surfaces). */
  dark?: boolean;
};

const LoginForm = ({ redirectTo = "/username", dark = true }: LoginFormProps) => {
  const { message } = App.useApp();
  const [login, { isLoading }] = useLoginMutation();
  const [form] = Form.useForm<{ userId: string }>();
  const router = useRouter();

  const onFinish = async (values: { userId: string }) => {
    try {
      const result = await login({ userId: values.userId }).unwrap();
      setSession(result);
      message.success("Login Successful!");
      form.resetFields();
      router.push(redirectTo);
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
        label={
          <Text style={{ color: dark ? "#CBD5E1" : undefined, fontWeight: 500 }}>
            User ID
          </Text>
        }
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

      {dark && (
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <Text style={{ color: "#64748B", fontSize: 13 }}>
            Secure access · Protected dashboard
          </Text>
        </div>
      )}
    </Form>
  );
};

export default LoginForm;