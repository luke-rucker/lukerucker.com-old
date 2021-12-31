import { formatDistance } from 'date-fns'
import { MetaFunction, useOutletContext } from 'remix'
import { Article } from '~/components/article'
import { Badge } from '~/components/badge'
import { Input } from '~/components/forms/input'
import { HeaderSection } from '~/components/header-section'
import { Link } from '~/components/link'
import { Post } from '~/db/posts.server'
import { formatDate, formatDistanceToToday } from '~/utils/dates'
import { publicPostPathFor } from '~/utils/paths'

export const meta: MetaFunction = ({ parentsData }) => {
  const parentData = Object.values(parentsData).at(-1)

  return {
    title: `${parentData.title} | Luke Rucker`,
  }
}

export default function ViewPost() {
  const post = useOutletContext<Post>()

  return (
    <>
      <HeaderSection
        text={post.title}
        left={
          <Badge className="ml-3">
            {post.publishedAt ? (
              <span>
                Published{' '}
                <time dateTime={formatDate(new Date(post.publishedAt))}>
                  {formatDistanceToToday(new Date(post.publishedAt))}
                </time>
              </span>
            ) : (
              'Draft'
            )}
          </Badge>
        }
        right={
          <div className="space-x-4">
            {post.publishedAt ? (
              <Link to={publicPostPathFor(post.slug)} className="text-xl">
                View on public site
              </Link>
            ) : null}

            <Link to="edit" className="text-xl">
              Edit
            </Link>
          </div>
        }
      />

      <p className="mb-4">
        Last edit was{' '}
        {formatDistance(new Date(post.editedAt), new Date(), {
          addSuffix: true,
        })}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section>
          <h3 className="text-xl font-semibold mb-2">Info</h3>
          <div className="bg-white p-4 shadow-xl">
            <Input
              label="Description"
              defaultValue={post.description}
              disabled
              readOnly
              className="mb-4"
            />

            <Input
              label="Public URL"
              defaultValue={publicPostPathFor(post.slug)}
              readOnly
              disabled
            />
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Preview</h3>
          <div className="bg-white p-4 shadow-xl max-h-96 overflow-auto">
            <Article html={post.html} />
          </div>
        </section>
      </div>
    </>
  )
}
