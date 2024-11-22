import { ModelObject } from '@adonisjs/lucid/types/model';

export default class PaginationService {
  static paginate(model: ModelObject) {
    const leftPages = model.getUrlsForRange(
      model.currentPage > 3 && model.currentPage <= model.lastPage / 2
        ? model.currentPage - 1
        : model.firstPage,
      model.currentPage > 3 && model.currentPage <= model.lastPage / 2
        ? model.currentPage + 1
        : model.firstPage + 2
    );

    const rightPages = model.getUrlsForRange(
      model.currentPage < model.lastPage - 2 && model.currentPage > model.lastPage / 2
        ? model.currentPage - 1
        : model.lastPage - 2,
      model.currentPage < model.lastPage - 2 && model.currentPage > model.lastPage / 2
        ? model.currentPage + 1
        : model.lastPage
    );

    const paginationProps = {
      leftPageUrls: leftPages,
      rightPageUrls: rightPages,
      paginationUrls: model.getUrlsForRange(1, model.lastPage),
      nextPageUrl: model.getNextPageUrl(),
      previousPageUrl: model.getPreviousPageUrl(),
    };

    return paginationProps;
  }
}
