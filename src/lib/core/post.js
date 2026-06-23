

export const PostData = async (api, data) => {
    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${api}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return fetchData

}

// {
//             userId: data?.user?.id || data?.id, // অথ লাইব্রেরি থেকে জেনারেট হওয়া ইউনিক আইডি
//             name: formData.name,
//             email: formData.email,
//             phone: formData.phone,
//             bloodGroup: formData.bloodGroup,
//             division: formData.division,
//             district: formData.district,
//             upazila: formData.upazila,
//             image: avatarUrl,
//             createdAt: new Date()
//         }