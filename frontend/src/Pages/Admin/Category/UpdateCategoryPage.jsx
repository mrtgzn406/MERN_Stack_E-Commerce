import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCategoryPage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const params = useParams();
    const categoryID = params.id;
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/categories/${categoryID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                message.success("Category updated successfully");
            } else {
                message.error("Category update is failed!");
            }
        } catch (error) {
            console.log("Category update is failed!: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        try {
            const fetchSingleCategory = async () => {
                setLoading(true);
                const response = await fetch(`${apiUrl}/api/categories/${categoryID}`, { method: "GET" });

                if (!response.ok) {
                    throw new Error("Fetching category data is failed");
                }

                const data = await response.json();

                if (data) {
                    form.setFieldsValue({
                        name: data.name,
                        img: data.img,
                    });
                }
            };
            fetchSingleCategory();
        } catch (error) {
            console.log("Fetching category data is failed: ", error);
        } finally {
            setLoading(false);
        }
    }, [apiUrl, categoryID, form]);

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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Category Image Link"
                    name="img"
                    rules={[
                        {
                            required: true,
                            message: "Please input your image link!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        // offset: 4,
                        span: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit" block>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default UpdateCategoryPage;
