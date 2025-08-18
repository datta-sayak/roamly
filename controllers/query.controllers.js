import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { topPlacesToVisit } from "../utils/openai_query.js";

const getTopPlaces = asyncHandler( async (req, res) => {
    const userQuery = req.query.q;
    
})

export { getTopPlaces }