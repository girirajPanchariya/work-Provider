import { ApplicationModel } from "../Models/ApplicationMOdel.js";
import { UserModel } from "../Models/UserModel.js";
import { workModel } from "../Models/workModel.js";

export const Application = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id: workId } = req.params;
    const { message } = req.body;

    const user = await UserModel.findById(userId);
    if (!user || user.loginType !== 'worker') {
      return res.status(400).json({ message: "User is not authorized to apply" });
    }

    const work = await workModel.findById(workId);
    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }

    const existing = await ApplicationModel.findOne({ workerId: userId, workId: workId.toString() });
    if (existing) {
      return res.status(400).json({ message: "User has already applied for this job" });
    }

    const application = new ApplicationModel({
      workerId: userId,
      workId,
      message
    });

    await application.save();

    return res.status(201).json({ 
      message: "Application submitted successfully", 
      workId: application.workId 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const relatedApplications = async (req, res) => {
    try {
        const { id: workId } = req.params;

        const applications = await ApplicationModel.find({ workId })
            .populate('workerId')
            .populate('workId');

        if (!applications.length) {
            return res.status(404).json({ message: 'No applications found', applications: [] });
        }

        return res.status(200).json({
            message: "Applications retrieved",
            applications,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};
