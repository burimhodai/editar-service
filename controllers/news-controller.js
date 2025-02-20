const { server_error, created, ok } = require("../helpers/responses");
const News = require("../models/News");

module.exports = {
  createNews: async (req, res) => {
    try {
      // Assuming the school ID is passed in the request body
      const { school, title, content, author } = req.body;

      const createdNews = new News({
        school, // Assigning the school to the news article
        title,
        content,
        author,
      });

      console.log({ NEWSDATA: req.body });
      await createdNews.save();
      created(res, "", createdNews);
    } catch (error) {
      server_error(res);
    }
  },

  getNews: async (req, res) => {
    try {
      const news = await News.find({ school: req.params.id })
        .populate({
          path: "school",
          select: "name",
        })
        .sort({ createdAt: "desc" });
      ok(res, "", news);
    } catch (error) {
      server_error(res);
    }
  },

  updateNews: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedNews = await News.findOneAndUpdate({ _id: id }, req.body);

      if (!updatedNews) {
        return server_error(res);
      }

      ok(res, "News updated successfully", updatedNews);
    } catch (error) {
      server_error(res);
    }
  },

  deleteNews: async (req, res) => {
    const deleteNews = await News.findByIdAndDelete(req.params.id);
    if (!deleteNews) {
      error_404(res, "News article was not found");
    }
    ok(res, "Deleted Successfully");
  },
};
