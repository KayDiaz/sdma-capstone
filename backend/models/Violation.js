import mongoose from "mongoose";

const violationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },

    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    violationType: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    severity: {
        type:String,
        enum: ["minor", "major", "critical"],
        default: "minor",
    },

    punishment: {
        type: String,
        default: "",
    },

    communityServiceHours:{
        type:Number,
        default: 0,
    },

    status:{
        type: String,
        enum: ["pending", "assigned", "completed"],
        default: "pending",
    },
}
);

const Violation = mongoose.model("Violation", violationSchema);

export default Violation;