import mongoose from "mongoose"

export default (from: Date, due: Date, project: mongoose.mongo.BSON.ObjectId) => {
    return [
        {
          $match: {
            action: "buy",
            section: "Skins",
            project: project,
            timestamp: {
                $gte: from,
                $lte: due
            }
          }
        },
        {
          $group: {
            _id: "$item",
            value: {
              $sum: 1
            }
          }
        }
      ]
}