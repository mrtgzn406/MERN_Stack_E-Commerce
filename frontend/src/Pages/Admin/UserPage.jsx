import { Button, Popconfirm, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";

const UserPage = () => {
    const [dataSource, setdataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const columns = [
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (imgSrc) => {
                return (
                    <img src={imgSrc} alt="Avatar" style={{ width: "100px", height: "100px", borderRadius: "10%" }} />
                );
            },
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <Popconfirm
                    title="Delete User"
                    description="Are you sure to delete this user?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => deleteUser(record.email)}
                >
                    <Button type="primary" danger>
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    const fetchUsers = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/users`);
            if (response.ok) {
                const data = await response.json();

                setdataSource(data);
            } else {
                message.error("Users data fetching is failed!");
            }
        } catch (error) {
            console.log("Users data fetching is failed!: ", error);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const deleteUser = async (userEmail) => {
        try {
            const response = await fetch(`${apiUrl}/api/users/${userEmail}`, { method: "DELETE" });
            if (response.ok) {
                message.success("User is deleted successfully");
                fetchUsers();
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

export default UserPage;
