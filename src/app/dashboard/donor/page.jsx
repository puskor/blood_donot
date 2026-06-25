import DonorDashboard from '@/components/dashboard/donor/Dashboard';
import { GetDonorDataById } from '@/lib/action/get/donate';
import { GetRequestById } from '@/lib/action/get/request';
import { getUserSession } from '@/lib/core/getSession';

const Donor = async () => {
    const user = await getUserSession();
    const userId = user?.id;

    // ১. বেসিক ডাটা নিয়ে আসা
    const requestData = await GetRequestById(userId);
    const donarData = await GetDonorDataById(userId); 

    let donationsData = [];
    
 if (donarData?.success && Array.isArray(donarData?.data)) {
    donationsData = await Promise.all(
        donarData.data.map(async (donation) => {
            // console.log(donation)
            try {
                // 🌟 পোর্টটি আপনার লোকাল সার্ভার অনুযায়ী (5000 বা 5001) নিশ্চিত করে নিন
                const response = await fetch(`http://localhost:5001/api/request/${donation.requestId}`, {
                    cache: 'no-store'
                });
                
                if (!response.ok) {
                    // console.error(`HTTP Error for request ID ${donation.requestId}: Status ${response.status}`);
                    return donation;
                }

                const resData = await response.json();
                // console.log(`Raw API Response for ${donation.requestId}:`, resData); // 👈 টার্মিনালে আসল চেহারা দেখার জন্য

                // 🌟 ডাটা সরাসরি resData-তে থাকতে পারে অথবা resData.data-তে থাকতে পারে, দুইটাই হ্যান্ডেল করা হলো
                const reqObj = resData?.data ? resData.data : resData;

                if (reqObj && reqObj.patientName) {
                    console.log("req",reqObj)
                    return {
                        ...donation,
                        
                        patientName: reqObj.patientName,
                        bloodGroup: reqObj.bloodGroup || "N/A",
                        location: reqObj.hospitalName || "Not Specified",
                        date: reqObj.neededDate || "N/A",
                        status: reqObj.status
                    };
                } else {
                    console.warn(`No patientName found in response for ID: ${donation.requestId}`);
                    return donation;
                }

            } catch (error) {
                console.error(`Fetch Error for ID ${donation.requestId}:`, error);
                return donation;
            }
        })
    );
}

// console.log("1st",donationsData)

    return (
        <div>
            <DonorDashboard 
                requestData={requestData} 
                donationsData={donationsData} 
            />
        </div>
    );
};

export default Donor;