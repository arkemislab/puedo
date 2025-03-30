FROM node:18-alpine AS base
 
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN 

RUN yarn global add turbo@2
COPY . .
 
RUN turbo prune docs --docker
 
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
 
COPY --from=builder /app/out/json/ .
RUN corepack enable pnpm && pnpm i --frozen-lockfile --ignore-scripts;
 
COPY --from=builder /app/out/full/ .

# fumadocs-mdx
RUN cd apps/docs && pnpm run postinstall

RUN corepack enable pnpm && pnpm run build;
 
FROM base AS runner
WORKDIR /app
 
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/.next/static ./apps/docs/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/public ./apps/docs/public

EXPOSE 3000

ENV PORT=3000
 
CMD node apps/docs/server.js