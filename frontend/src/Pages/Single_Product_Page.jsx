import { useEffect, useState } from "react";
import Single_Product from "../components/Single_Product/Single_Product";
import { useParams } from "react-router-dom";
import { message } from "antd";

const Single_Product_Page = () => {
    const [singleProduct, setSingleProduct] = useState(null);
    const params = useParams();
    const productID = params.id;

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/products/${productID}`);

                if (response.ok) {
                    const data = await response.json();
                    setSingleProduct(data);
                } else {
                    message.error("Ürün getirme hatası ");
                }
            } catch (error) {
                console.log(`Veri getirme hatası: ${error}`);
            }
        };
        fetchSingleProduct();
    }, [apiUrl, productID]);

    return singleProduct ? (
        <Single_Product singleProduct={singleProduct} setSingleProduct={setSingleProduct} />
    ) : (
        <h1>Ürün Detayları Yükleniyor</h1>
    );
};

export default Single_Product_Page;
