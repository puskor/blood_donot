export const updateData = async (api, data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${api}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json()
}