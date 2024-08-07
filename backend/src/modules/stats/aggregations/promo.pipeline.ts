import mongoose from "mongoose"

export default (from: Date, due: Date, project: mongoose.mongo.BSON.ObjectId) => {
    return [
        {
          $match: {
            action: "promo",
            type: {
                $ne: "skin"
            },
            project: project,
            timestamp: {
                $gte: from,
                $lte: due
            }
          }
        },
        {
          $group: {
            _id: "$type",
            value: {
              $sum: 1
            }
          }
        }
      ]
}