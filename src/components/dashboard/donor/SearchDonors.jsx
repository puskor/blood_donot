"use client";

import { useState, useEffect } from 'react';
import { FiSearch, FiSliders, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const SearchDonors = ({ onSearch }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // ফিল্টার স্টেটসমূহ
    const [filters, setFilters] = useState({
        bloodGroup: '',
        division: '',
        district: '',
        upazila: ''
    });

    // ডাইনামিক অপশনের জন্য স্টেট
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [availableUpazilas, setAvailableUpazilas] = useState([]);

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    // বিভাগ পরিবর্তন হলে জেলা এবং উপজেলা রিসেট ও ফিল্টার করার লজিক
    useEffect(() => {
        if (filters.division && bdGeographicData[filters.division]) {
            setAvailableDistricts(Object.keys(bdGeographicData[filters.division].districts));
        } else {
            setAvailableDistricts([]);
        }
        setAvailableUpazilas([]);
        setFilters(prev => ({ ...prev, district: '', upazila: '' }));
    }, [filters.division]);

    // জেলা পরিবর্তন হলে উপজেলা ফিল্টার করার লজিক
    useEffect(() => {
        if (filters.division && filters.district && bdGeographicData[filters.division]?.districts[filters.district]) {
            setAvailableUpazilas(bdGeographicData[filters.division].districts[filters.district]);
        } else {
            setAvailableUpazilas([]);
        }
        setFilters(prev => ({ ...prev, upazila: '' }));
    }, [filters.district, filters.division]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(filters);
        }
        setIsMobileOpen(false);
    };

    return (
        <div className="w-full bg-white border border-slate-100 shadow-sm rounded-2xl p-4 md:p-6 transition-all">
            
            {/* 📱 মোবাইল ডিভাইসের টগল বাটন */}
            <div className="flex md:hidden items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 font-semibold font-poppins text-sm">
                    <FiSliders className="text-rose-600 h-4 w-4" />
                    <span>Filter Blood Requests</span>
                </div>
                <button
                    type="button"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="flex items-center gap-1 text-xs font-bold font-poppins px-3 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all"
                >
                    {isMobileOpen ? (
                        <>Hide Filters <FiChevronUp className="h-4 w-4" /></>
                    ) : (
                        <>Show Filters <FiChevronDown className="h-4 w-4" /></>
                    )}
                </button>
            </div>

            {/* 📊 সার্চ ফর্ম বডি (ড্রপডাউন মোড) */}
            <form 
                onSubmit={handleSubmit}
                className={`
                    mt-4 md:mt-0 transition-all duration-300 ease-in-out overflow-hidden
                    ${isMobileOpen ? 'max-h-[600px] opacity-100 block' : 'max-h-0 opacity-0 hidden md:max-h-none md:opacity-100 md:grid'}
                    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end
                `}
            >
                {/* Blood Group Select */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Group</label>
                    <select
                        name="bloodGroup"
                        value={filters.bloodGroup}
                        onChange={handleChange}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-rose-600 focus:bg-white transition-all cursor-pointer"
                    >
                        <option value="">All Groups</option>
                        {bloodGroups.map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>

                {/* Division Select */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Division</label>
                    <select
                        name="division"
                        value={filters.division}
                        onChange={handleChange}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-rose-600 focus:bg-white transition-all cursor-pointer"
                    >
                        <option value="">Select Division</option>
                        {Object.keys(bdGeographicData).map(div => (
                            <option key={div} value={div}>{div}</option>
                        ))}
                    </select>
                </div>

                {/* District Select */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">District</label>
                    <select
                        name="district"
                        value={filters.district}
                        onChange={handleChange}
                        disabled={!filters.division}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-rose-600 focus:bg-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">Select District</option>
                        {availableDistricts.map(dist => (
                            <option key={dist} value={dist}>{dist}</option>
                        ))}
                    </select>
                </div>

                {/* Upazila Select */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upazila</label>
                    <select
                        name="upazila"
                        value={filters.upazila}
                        onChange={handleChange}
                        disabled={!filters.district}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-rose-600 focus:bg-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">Select Upazila</option>
                        {availableUpazilas.map(upz => (
                            <option key={upz} value={upz}>{upz}</option>
                        ))}
                    </select>
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shadow-rose-600/10 transition-all font-poppins"
                >
                    <FiSearch className="h-4 w-4" />
                    <span>Search</span>
                </button>
            </form>
        </div>
    );
};

// 🗺️ বাংলাদেশী ভৌগোলিক ডাটাবেজ অবজেক্ট (বিভাগ -> জেলা -> উপজেলা)
const bdGeographicData = {
    "Rangpur": {
        districts: {
            "Kurigram": ["Chilmari", "Kurigram Sadar", "Nageshwari", "Bhurungamari", "Phulbari", "Rajarhat", "Ulipur", "Roumari", "Char Rajibpur"],
            "Dinajpur": ["Dinajpur Sadar", "Birganj", "Kaharole", "Bochaganj", "Eshwarpur", "Panchagarh", "Phulbari", "Nawabganj", "Ghoraghat", "Hakimpur", "Chirirbandar", "Parbatipur"],
            "Rangpur": ["Rangpur Sadar", "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"],
            "Gaibandha": ["Gaibandha Sadar", "Sadullapur", "Palashbari", "Gobindaganj", "Sundarganj", "Saghata", "Phulchhari"],
            "Lalmonirhat": ["Lalmonirhat Sadar", "Patgram", "Hatibandha", "Kaliganj", "Aditmari"],
            "Nilphamari": ["Nilphamari Sadar", "Saidpur", "Jaldhaka", "Kishoreganj", "Domar", "Dimla"],
            "Panchagarh": ["Panchagarh Sadar", "Boda", "Debiganj", "Atwari", "Tetulia"],
            "Thakurgaon": ["Thakurgaon Sadar", "Pirganj", "Baliadangi", "Haripur", "Ranisankail"]
        }
    },
    "Dhaka": {
        districts: {
            "Dhaka": ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar", "Mirpur", "Gulshan", "Dhanmondi", "Uttara", "Motijheel"],
            "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreeppur"],
            "Narayanganj": ["Narayanganj Sadar", "Araihazar", "Bandar", "Rupganj", "Sonargaon"],
            "Tangail": ["Tangail Sadar", "Basail", "Bhuapur", "Delduar", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur"],
            "Faridpur": ["Faridpur Sadar", "Boalmari", "Alfadanga", "Madhukhali", "Bhanga", "Nagarkanda", "Saltha", "Sadarpur", "Charbhadrasan"],
            "Manikganj": ["Manikganj Sadar", "Singair", "Shibalaya", "Saturia", "Harirampur", "Gheor", "Daulatpur"],
            "Munshiganj": ["Munshiganj Sadar", "Tongibari", "Srinagar", "Lauhajang", "Gajaria", "Sirajdikhan"]
        }
    },
    "Chattogram": {
        districts: {
            "Chattogram": ["Chittagong Sadar", "Anwara", "Banshkhali", "Boalkhali", "Chandananish", "Fatikchhari", "Hathazari", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandeep", "Satkania", "Sitakunda"],
            "Cox's Bazar": ["Cox's Bazar Sadar", "Chakaria", "Ukhiya", "Teknaf", "Ramu", "Pekua", "Kutubdia", "Maheshkhali"],
            "Cumilla": ["Cumilla Sadar", "Barura", "Chandina", "Daudkandi", "Debidwar", "Homna", "Laksam", "Muradnagar", "Nangalkot", "Titas", "Meghna", "Monohorganj"],
            "Feni": ["Feni Sadar", "Chagalnaiya", "Daganbhuiyan", "Parshuram", "Fulgazi", "Sonagazi"],
            "Noakhali": ["Noakhali Sadar", "Begumganj", "Chatkhil", "Companyganj", "Hatiya", "Senbagh", "Subarnachar", "Sonaimuri", "Kabirhat"]
        }
    },
    "Rajshahi": {
        districts: {
            "Rajshahi": ["Boalia", "Matihar", "Rajpara", "Shah Makhdum", "Paba", "Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Puthia", "Tanore"],
            "Bogra": ["Bogra Sadar", "Adamdighi", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"],
            "Pabna": ["Pabna Sadar", "Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Santhia", "Sujanagar"],
            "Sirajganj": ["Sirajganj Sadar", "Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Rayganj", "Shahjadpur", "Tarash", "Ullahpara"]
        }
    },
    "Khulna": {
        districts: {
            "Khulna": ["Khulna Sadar", "Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsha"],
            "Jessore": ["Jessore Sadar", "Abhaynagar", "Bagherpara", "Chougachha", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"],
            "Satkhira": ["Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Shyamnagar", "Tala"]
        }
    },
    "Sylhet": {
        districts: {
            "Sylhet": ["Sylhet Sadar", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Zakiganj", "South Surma"],
            "Moulvibazar": ["Moulvibazar Sadar", "Barlekha", "Kamalganj", "Kulaura", "Rajnagar", "Sreemangal", "Juri"],
            "Habiganj": ["Habiganj Sadar", "Bahubal", "Baniyachong", "Chunarughat", "Ajmiriganj", "Madhabpur", "Nabiganj", "Lakhai"]
        }
    },
    "Barishal": {
        districts: {
            "Barishal": ["Barisal Sadar", "Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gournadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
            "Bhola": ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Monpura", "Lalmohan", "Tazumuddin", "Borhanuddin"],
            "Patuakhali": ["Patuakhali Sadar", "Bauphal", "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Dumki", "Rangabali"]
        }
    },
    "Mymensingh": {
        districts: {
            "Mymensingh": ["Mymensingh Sadar", "Bhaluka", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur", "Trishal", "Tarafund", "Dhobaura"],
            "Jamalpur": ["Jamalpur Sadar", "Bakshiganj", "Dewanganj", "Isampur", "Madarganj", "Melandaha", "Sarishabari"],
            "Netrokona": ["Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Purbadhala"]
        }
    }
};

export default SearchDonors;