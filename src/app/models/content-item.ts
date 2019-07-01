import {ContentDefinition} from '../interfaces/content.definition';

export class ContentItem implements ContentDefinition {
  name: string;

  constructor(params: ContentDefinition) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
