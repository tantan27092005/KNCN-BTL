import { footerData } from './footer.mock';

function Footer() {
    return (
        <footer className="bg-slate-50 border-t-2 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Phần liên hệ */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">{footerData.contact.title}</h3>
                        <ul className="space-y-2">
                            {footerData.contact.items.map((item, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Phần hỗ trợ khách hàng */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">{footerData.support.title}</h3>
                        <ul className="space-y-2">
                            {footerData.support.items.map((item, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Phần về công ty */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">{footerData.about.title}</h3>
                        <ul className="space-y-2">
                            {footerData.about.items.map((item, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Phần kết nối với chúng tôi */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">{footerData.social.title}</h3>
                        <ul className="space-y-2">
                            {footerData.social.items.map((item, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Phần bản quyền */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>© 2023 Công ty Cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM cấp ngày 02/01/2007.</p>
                    <p>Địa chỉ: 128 Trần Quang Khải, P. Tân Định, Q.1, TP.Hồ Chí Minh. Điện thoại: 028 38125960. Email: cskh@thegioididong.com.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
