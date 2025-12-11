import { convertToTimezoneOffset } from '$lib/utils/days';
import { fail } from '@sveltejs/kit';

export const actions = {
  book: async ({
    request,
    fetch,
  }: {
    request: Request;
    fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const start = formData.get('slot-start');
    const end = formData.get('slot-end');

    if (!start || !end) {
      return fail(400, {
        error: 'Start and end are required',
        success: false,
      });
    }

    const body = {
      attendees: [
        {
          email,
          name,
        },
      ],
      end: convertToTimezoneOffset(end as string, 1),
      start: convertToTimezoneOffset(start as string, 1),
    };

    try {
      const response = await fetch(
        'https://calendar.meetchase.ai/api/meetings',
        {
          body: JSON.stringify(body),
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      );

      console.log(response);

      if (response.status !== 201) {
        return fail(response.status, {
          error: 'Failed to book appointment',
          success: false,
        });
      }

      return {
        success: true,
      };
    } catch {
      return fail(500, {
        error: 'Failed to book appointment',
        success: false,
      });
    }
  },
};
