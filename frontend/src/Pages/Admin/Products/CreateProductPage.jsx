import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);

            try {
                const response = await fetch(`${apiUrl}/api/categories`, { method: "GET" });
                if (response.ok) {
                    const data = await response.json();

                    setCategories(data);
                } else {
                    message.error("Category data fetching is failed!");
                }
            } catch (error) {
                console.log("Category data fetching is failed!:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [apiUrl]);

    const onFinish = async (values) => {
        setLoading(true);
        const imgLinks = values.img.split("\n").map((link) => link.trim());
        const colors = values.colors.split("\n").map((color) => color.trim());
        const sizes = values.sizes.split("\n").map((size) => size.trim());

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    price: {
                        current: values.current,
                        discount: values.discount,
                    },
                    colors: colors,
                    sizes: sizes,
                    img: imgLinks,
                }),
            });
            if (response.ok) {
                message.success("Product created successfully");
                // form.resetFields();
            } else {
                message.error("Product creating is failed!");
            }
        } catch (error) {
            console.log("Product creating is failed!: ", error);
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
                // autoComplete="off"
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input product name!",
                        },
                    ]}
                >
                    <Input placeholder="Mercury Tee" />
                </Form.Item>
                <Form.Item
                    label="Product Price"
                    name="current"
                    rules={[
                        {
                            required: true,
                            message: "Please input product price!",
                        },
                    ]}
                >
                    <InputNumber min={1} placeholder="200" />
                </Form.Item>
                <Form.Item
                    label="Product Discount Rate"
                    name="discount"
                    rules={[
                        {
                            required: true,
                            message: "Please input product discount rate! ",
                        },
                    ]}
                >
                    <InputNumber max={100} min={1} placeholder="20" />
                </Form.Item>

                <Form.Item
                    label="Product Image (Image Links)"
                    name="img"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please input at least four product image links and input each link to the new row!",
                        },
                    ]}
                >
                    <Input.TextArea
                        placeholder={`https://e-commerce-udemy.netlify.app/img/products/product1/1.png\nhttps://e-commerce-udemy.netlify.app/img/products/product1/2.png\nhttps://e-commerce-udemy.netlify.app/img/products/product1/3.png`}
                        autoSize={{ minRows: 4 }}
                    />
                </Form.Item>
                <Form.Item
                    label="Product Colors (Color Name)"
                    name="colors"
                    rules={[
                        {
                            required: true,
                            message: "Please input at least one color name and input each of them to the new row",
                        },
                    ]}
                >
                    <Input.TextArea placeholder={`blue\nred\norange`} autoSize={{ minRows: 4 }} />
                </Form.Item>
                <Form.Item
                    label="Product Sizes"
                    name="sizes"
                    rules={[
                        {
                            required: true,
                            message: "Please input at least 1 size and input each size to the new row",
                        },
                    ]}
                >
                    <Input.TextArea placeholder={`XS\nS\nM\nXL`} autoSize={{ minRows: 4 }} />
                </Form.Item>
                <Form.Item
                    label="Product Category"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: "Please select 1 category",
                        },
                    ]}
                >
                    <Select>
                        {categories.map((item) => {
                            return (
                                <Select.Option value={item._id} key={item._id}>
                                    {item.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Product Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Please write a description text about product!",
                        },
                    ]}
                >
                    <ReactQuill
                        theme="snow"
                        style={{
                            backgroundColor: "white",
                        }}
                    />
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

export default CreateProductPage;
