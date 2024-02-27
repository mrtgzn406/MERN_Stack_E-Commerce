import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCouponPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const params = useParams();
    const couponId = params.id;
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("Coupon updated successfully.");
                navigate(`/admin/coupons`);
            } else {
                message.error("Update process is failed!");
            }
        } catch (error) {
            console.log("Update process is failed!:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSingleCoupon = async () => {
            setLoading(true);

            try {
                const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

                if (!response.ok) {
                    throw new Error("Coupon data fetching is failed!");
                }

                const data = await response.json();

                if (data) {
                    form.setFieldsValue({
                        couponCode: data.couponCode,
                        discountRate: data.discountRate,
                    });
                }
            } catch (error) {
                console.log("Veri hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSingleCoupon();
    }, [apiUrl, couponId, form]);

    return (
        <Spin spinning={loading}>
            <Form form={form} name="basic" layout="vertical" autoComplete="off" onFinish={onFinish}>
                <Form.Item
                    label="Coupon Name"
                    name="couponCode"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a coupon code!",
                        },
                    ]}
                >
                    <Input />
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
                    <InputNumber min={1} max={100} />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form>
        </Spin>
    );
};

export default UpdateCouponPage;
