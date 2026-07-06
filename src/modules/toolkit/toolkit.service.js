import ToolKit from "./toolkit.model.js";
import toolAnalytics from "./toolAnalytics.model.js";

const createTool = async (payload) => {
    return await ToolKit.create(payload);
};

const updateTool = async (id, payload) => {
    return await ToolKit.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const deleteTool = async (id) => {
    return await ToolKit.findByIdAndDelete(id);
};

const getToolById = async (id) => {
    return await ToolKit.findById(id);
};

const getTools = async (query) => {
    const { page = 1, limit = 12, category, tags, search, isFeatured } = query;

    const filter = {
        isActive: true,
    };

    if (category) {
        filter.category = category;
    }

if (tags) {
    filter.tags = {
        $in: tags.split(","),
    };
}

if (isFeatured) {
    filter.isFeatured = isFeatured === "true";
}

if (search) {
    filter.search = {
        $search: search,
    };
}

const total = await ToolKit.countDocuments(filter);
const tools = await ToolKit.find(filter)
    .sort({
        isFeatured: -1,
        createdAt: -1,
    })
    .skip((page - 1) * limit)
    .limit(Number(limit));

return {
    tools,
    pagination: {
        page: Number(page),
        limit: Number(limit),
    },
    totalPages: Math.cell(total / limit),
};
};

const recordToolOpen = async ({ toolId, userId, ipAddress, userAgent }) => {
return await toolAnalytics.create({
    toolId,
    userId,
    ipAddress,
    userAgent,
    eventName: "tool_opened",
});
};

const getPopularTools = async () => {
return await toolAnalytics.aggregate([
    {$group: {_id: "$toolId",opens: { $sum: 1 },}},
    {$sort: { opens: -1 }},
    {$limit: 10}
]);
};

const toolKitService = {
  createTool,
  updateTool,
  deleteTool,
  getToolById,
  getTools,
  recordToolOpen,
  getPopularTools,
};
export default toolKitService;
