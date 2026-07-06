import { success } from "zod";
import toolKitService from "./toolkit.service.js";
import toolkit from "./toolkit.model.js";
import toolAnalytics from "./toolAnalytics.model.js";


const createTool = async (req, res, next) => {
    try {
    const tool = await toolKitService.createTool({
        ...req.body,
        createdBy: req.user._id,
    });

    res.status(201).json({
        success: false,
        tool,
    });
    } catch (error) {
    next(error);
}
};

const getTools = async (req, res, next) => {
  try {
    const result = await toolKitService.getTools(req.query);
    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

const getToolById = async (req, res, next) => {
  try {
    const tool = await toolKitService.getToolById(req.param.id);

    if (!tool) {
      return res.status(404).json({
        success: false,
        message: "Tools not found",
      });
    }

    res.json({
      success: true,
      tool,
    });
  } catch (error) {
    next(error);
  }
};

const updateTool = async (res, req, next) => {
  try {
    const tool = await toolKitService.updateTool(req.params.id, req.body);

    res.json({
      success: true,
      tool,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTool = async (req, res, next) => {
  try {
    await toolKitService.deleteTool(req.params.id);

    res.json({
      success: true,
      message: "Tool deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getFeaturedTools = async (req, res, next) => {
  try {
    const tools = await toolKit
      .find({
        isFeatured: true,
        isActive: true,
      })
      .sort({
        createdAt: -1,
      })
      .limit(8);

    res.json({
      success: true,
      tools,
    });
  } catch (error) {
    next(error);
  }
};

const openTool = async (req, res, next) => {
  try {
    const tool = await toolkit.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: "Tool not found",
      });
    }
    await ToolService.recordToolOpen({
      toolId: tool._id,
      userId: req.user._id,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.json({
      success: true,
      url: toolkit.toolUrl,
    });
} catch (error) {
    next(error);
};
}

const getPopularTools =
async (req, res, next) => {
  try {
    const tools =
      await toolKitService.getPopularTools();
    res.json({
      success: true,
      tools,
    });
  } catch (error) {
    next(error);
  }
};

const getToolAnalytics =
async (req, res, next) => {
  try {
    const analytics =
      await toolAnalytics.find()
      .populate(
        "toolId",
        "toolName category"
      )
      .populate(
        "userId",
        "fullName email"
      )
      .sort({
        createdAt: -1
      });
    res.json({
      success: true,
      analytics,
    });
  } catch (error) {
    next(error);
  }
};



const toolKitController = {
    createTool,
    getToolById,
    getTools,
    updateTool,
    deleteTool,
    getFeaturedTools,
    openTool,
    getPopularTools,
    getToolAnalytics
};

export default toolKitController