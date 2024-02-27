import Campaign_Item from "./Campaign_Item";
import "./Campaigns.css";
const Campaigns = () => {
    return (
        <section className="campaigns">
            <div className="container">
                <div className="campaigns-wrapper">
                    <Campaign_Item />
                    <Campaign_Item />
                </div>
                <div className="campaigns-wrapper">
                    <Campaign_Item />
                    <Campaign_Item />
                </div>
            </div>
        </section>
    );
};

export default Campaigns;
