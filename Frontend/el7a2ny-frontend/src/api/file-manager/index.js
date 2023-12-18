import { deepCopy } from '../../utils/deep-copy';
import { applyPagination } from '../../utils/apply-pagination';
import { items } from './data';
import { applySort } from '../../utils/apply-sort';

class FileManagerApi {
  getItems(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(items);
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((file) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          const matched = file.name.toLowerCase().includes(filters.query.toLowerCase());

          if (!matched) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count
    });
  }
}

export const fileManagerApi = new FileManagerApi();
