import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useState } from "react";

const CreateCouponPage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/coupons`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("Coupon created successfully.");
                form.resetFields();
            } else {
                message.error("Coupon creating is failed!");
            }
        } catch (error) {
            console.log("Coupon creating is failed!", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Spin spinning={loading}>
            <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    label="Coupon Code"
                    name="couponCode"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a coupon code!",
                        },
                    ]}
                >
                    <Input placeholder="MAYIS2023" />
                </Form.Item>

                <Form.Item
                    label="Coupon Discount Rate"
                    name="discountRate"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a coupon discount rate!",
                        },
                    ]}
                >
                    <InputNumber max={100} min={1} placeholder="24" />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form>
        </Spin>
    );
};

export default CreateCouponPage;
