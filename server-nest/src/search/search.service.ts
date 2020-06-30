import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { Index } from '../common/types'
import { isEmpty } from 'lodash'

@Injectable()
export class SearchService {
  constructor (private readonly client: ElasticsearchService) {}

  async create (id: string, index: Index, doc: Record<string, unknown>, refresh: any = 'true') {
    try {
      const { statusCode } = await this.client.create({
        id: id,
        index: index,
        refresh: refresh,
        body: { doc: doc }
      })
      return statusCode
    } catch (error) {
      console.error(error)
    }
    return 400
  }

  async update (id: string, index: Index, doc: Record<string, unknown>, refresh: any = 'true') {
    try {
      const { statusCode } = await this.client.update({
        id: id,
        index: index,
        refresh: refresh,
        body: { doc: doc }
      })
      return statusCode
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async searchAll (search: any) {
    const {
      body: {
        hits: { hits }
      }
    } = await this.client.search({
      index: 'databrary-*',
      body: {
        query: { multi_match: { query: search } }
      }
    })

    if (isEmpty(hits)) return []

    const result = hits.map(
      ({ id, _index: index, _score: score, _source: { doc, ...ingest } }) => {
        const user = isEmpty(ingest) ? doc : ingest
        return { index, id, score, ...user }
      }
    )

    return result
  }
}
