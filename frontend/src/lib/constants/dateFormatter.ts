// dateFormatter.ts

/**
 * Converts a MongoDB date string to a human-readable format.
 * @param {string} mongoDateStr - The MongoDB date string.
 * @returns {string} - The formatted date string.
 */
export function formatMongoDate(mongoDateStr: string): string {
    const date = new Date(mongoDateStr);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  