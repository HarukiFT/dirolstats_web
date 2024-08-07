import mongoose from "mongoose"

export default (from: Date, due: Date, project: mongoose.mongo.BSON.ObjectId) => {
    return [
        {
          $match: {
            action: "promo",
            type: 'skin',
            project: project,
            timestamp: {
                $gte: from,
                $lte: due
            }
          }
        },
        {
          $group: {
            _id: "$skin",
            value: {
              $sum: 1
            }
          }
        }
      ]
}