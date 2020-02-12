import { createParamDecorator } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CurrentUserDecorator = createParamDecorator((data, [root, args, ctx, info]) => ctx.req.user);

export default CurrentUserDecorator;
