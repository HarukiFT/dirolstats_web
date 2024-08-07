import mongoose from "mongoose"

export default (from: Date, due: Date, project: mongoose.mongo.BSON.ObjectId) => {
    return [
        {
          $match: {
            action: "join",
            project: project,
            timestamp: {
                $gte: from,
                $lte: due
            }
          }
        },
        {
          $addFields:
            {
              day: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$timestamp"
                }
              }
            }
        },
        {
          $group: {
            _id: {
              day: "$day",
              planet: "$planet"
            },
            value: {
              $sum: 1
            }
          }
        }
      ]
}