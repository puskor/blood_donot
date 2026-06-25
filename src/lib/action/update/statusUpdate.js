import { updateData } from "@/lib/core/update"

export const statusUpdate = async (requestId, donorId, status) => {

    const api = `api/request/update/${requestId}`
    const data = {
        donorId: donorId,
        status: status
    }
    
    const result = await updateData(api, data)
    return result

}