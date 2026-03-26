"use client";
import React from "react";
import { App, Button, Form,  Input } from "antd";


import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/app/hooks/api/api";


const Login = () => {
  const { message } = App.useApp();
  const [login, { isLoading }] = useLoginMutation();
  const [form] = Form.useForm<{ userId: string }>(); 
  const router = useRouter();

  const onFinish = async (values: { userId: string }) => {
    
    try {
      // Login API call (password skipped)
       await login({ userId: values.userId}).unwrap();
      router.push("/username");

      // Token cookie backend থেকে set হবে, localStorage দরকার নেই
      message.success("Login Successful!");
      form.resetFields()
    } catch (err: unknown) {


  // Type guard: check if err is an object and has "data"
  if (err && typeof err === "object" && "data" in err) {
    const errorData = (err as { data?: { message?: string } }).data;
    message.error(errorData?.message || "Invalid User ID!");
  } else {
    message.error("Invalid User ID!");
  }
}
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <Form
        name="loginForm"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          
          name="userId"
          rules={[{ required: true, message: "Please enter your User ID!" }]}
        >
          <Input.Password placeholder="Enter your User ID" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "50%" }}
            loading={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
