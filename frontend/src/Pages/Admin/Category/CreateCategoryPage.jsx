import { Button, Form, Input, Spin, message } from "antd";
import { useState } from "react";

const CreateCategoryPage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                message.success("Category created successfully");
                form.resetFields();
            } else {
                message.error("Category creating is failed!");
            }
        } catch (error) {
            console.log("Category creating is failed!: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                name="basic"
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input category name!",
                        },
                    ]}
                >
                    <Input placeholder="Fashion" />
                </Form.Item>

                <Form.Item
                    label="Category Image Link"
                    name="img"
                    rules={[
                        {
                            required: true,
                            message: "Please input only one category image link!",
                        },
                    ]}
                >
                    <Input placeholder="https://e-commerce-udemy.netlify.app/img/categories/categories6.png" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        // offset: 4,
                        span: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit" block>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default CreateCategoryPage;
