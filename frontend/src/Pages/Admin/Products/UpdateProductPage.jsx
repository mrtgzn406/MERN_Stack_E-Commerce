import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const params = useParams();
    const productId = params.id;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const [categoriesResponse, singleProductResponse] = await Promise.all([
                    fetch(`${apiUrl}/api/categories`),
                    fetch(`${apiUrl}/api/products/${productId}`),
                ]);

                if (!categoriesResponse.ok || !singleProductResponse.ok) {
                    message.error("Veri getirme başarısız.");
                    return;
                }

                const [categoriesData, singleProductData] = await Promise.all([
                    categoriesResponse.json(),
                    singleProductResponse.json(),
                ]);

                setCategories(categoriesData);

                if (singleProductData) {
                    form.setFieldsValue({
                        name: singleProductData.name,
                        current: singleProductData.price.current,
                        discount: singleProductData.price.discount,
                        description: singleProductData.description,
                        img: singleProductData.img.join("\n"),
                        colors: singleProductData.colors.join("\n"),
                        sizes: singleProductData.sizes.join("\n"),
                        category: singleProductData.category,
                    });
                }
            } catch (error) {
                console.log("Veri hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [apiUrl, productId, form]);

    const onFinish = async (values) => {
        setLoading(true);
        const imgLinks = values.img.split("\n").map((link) => link.trim());
        const colors = values.colors.split("\n").map((link) => link.trim());
        const sizes = values.sizes.split("\n").map((link) => link.trim());
        try {
            const response = await fetch(`${apiUrl}/api/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    price: {
                        current: values.current,
                        discount: values.discount,
                    },
                    colors,
                    sizes,
                    img: imgLinks,
                }),
            });

            if (response.ok) {
                message.success("Product is updated successfully");
                navigate("/admin/products");
            } else {
                message.error("Update process is failed!");
            }
        } catch (error) {
            console.log("Update process is failed!:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Spin spinning={loading}>
            <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
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
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Category"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: "Please select one category!",
                        },
                    ]}
                >
                    <Select>
                        {categories.map((category) => (
                            <Select.Option value={category._id} key={category._id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
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
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Discount Rate"
                    name="discount"
                    rules={[
                        {
                            required: true,
                            message: "Please input a product discount rate!",
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Product Images (Links)"
                    name="img"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please input at least four product image links and input each link to the new row!",
                        },
                    ]}
                >
                    <Input.TextArea autoSize={{ minRows: 4 }} />
                </Form.Item>
                <Form.Item
                    label="Product Colors (Color Name)"
                    name="colors"
                    rules={[
                        {
                            required: true,
                            message: "Please input at least one color name and input each of them to the new row!",
                        },
                    ]}
                >
                    <Input.TextArea autoSize={{ minRows: 4 }} />
                </Form.Item>
                <Form.Item
                    label="Product Sizes"
                    name="sizes"
                    rules={[
                        {
                            required: true,
                            message: "Please input at least 1 size and input each size to the new row!",
                        },
                    ]}
                >
                    <Input.TextArea autoSize={{ minRows: 4 }} />
                </Form.Item>
                <Form.Item
                    label="Product Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Please input a product description!",
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

                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form>
        </Spin>
    );
};

export default UpdateProductPage;
