import { helper } from '@ember/component/helper';
import { format } from 'date-fns';

export function formatDate([date], { format: formatStr }) {
  if (!date) {
    return '';
  }

  return format(date, formatStr);
}

export default helper(formatDate);
