import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
    const [dataSource, setdataSource] = useState([]);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const columns = [
        {
            title: "Category Image",
            dataIndex: "img",
            key: "img",
            render: (imgSrc) => {
                return <img src={imgSrc} alt="Category" style={{ width: "100px" }} />;
            },
        },
        {
            title: "Category Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <b>{text}</b>,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => navigate(`/admin/categories/update/${record._id}`)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete Category"
                        description="Are you sure to delete this category?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteCategory(record._id)}
                    >
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const fetchCategories = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/categories`, { method: "GET" });
            if (response.ok) {
                const data = await response.json();

                setdataSource(data);
            } else {
                message.error("Category data fetching is failed!");
            }
        } catch (error) {
            console.log("Category data fetching is failed! : ", error);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const deleteCategory = async (categoryID) => {
        try {
            const response = await fetch(`${apiUrl}/api/categories/${categoryID}`, { method: "DELETE" });
            if (response.ok) {
                message.success("Category deleted successfully");
                fetchCategories();
            } else {
                message.error("Delete process is failed!");
            }
        } catch (error) {
            console.log("Delete process is failed!: ", error);
        } finally {
            setLoading(false);
        }
    };

    return <Table dataSource={dataSource} columns={columns} rowKey={(record) => record._id} loading={loading} />;
};

export default CategoryPage;
