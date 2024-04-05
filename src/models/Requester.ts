import { RequestUtils } from "./utils/RequestUtils";
import {environment} from '../environments/environment';

export class Requester {

  constructor() {
    this.languages = [];
    this.sources = [];
    this.truthRatings = [];
    this.entities = [];
    this.keywords = [];
    this.dates = [];
    this.author = [];
    this.currentOffset = 0;
    this.entitiesConjunctionMode = false;
    this.keywordsConjunctionMode = false;
    this.order = false;
    this.orderBy = "3";
    this.howToOrder = "false"
  }

  private static readonly requestData = RequestUtils.previewRequest;
  entities: string[];
  truthRatings: number[];
  author: string[];
  keywords: string[];
  languages: string[];
  sources: string[];
  dates: Date[];
  currentOffset: number;
  entitiesConjunctionMode: boolean;
  keywordsConjunctionMode: boolean;
  order: boolean; // True if results have to be ordered, false otherwise
  orderBy: string;      // 1 = Truth, 2 = Author and 3 = Time
  howToOrder: string;  // false = asc and true = desc
  entitiesSearchIncludeArticles = false;

  public configureWithQueyParams(params: { namedEntites: string | undefined; truthRatings: string | undefined; author: string | undefined; keywords: string | undefined; languages: string | undefined; sources: string | undefined; timesPeriod: string | undefined; entitiesConjunctionMode: string | undefined; keywordsConjunctionMode: string | undefined; entitiesSearchIncludeArticles: string | undefined; order: string | undefined; orderBy: string | undefined; howToOrder: string | undefined; }) {
    if (params.namedEntites !== undefined) {
      this.entities = params.namedEntites.split(',');
    }
    if (params.truthRatings !== undefined) {
      for (const rating of params.truthRatings.split(',')) {
        this.truthRatings.push(parseInt(rating));
      }
    }
    if (params.author !== undefined) {
      this.author = params.author.split(',');
    }
    if (params.keywords !== undefined) {
      this.keywords = params.keywords.split(',');
    }
    if (params.languages !== undefined) {
      this.languages = params.languages.split(',');
    }
    if (params.sources !== undefined) {
      this.sources = params.sources.split(',');
    }
    if (params.timesPeriod !== undefined) {
      const datesArray = params.timesPeriod.split(',');
      this.dates.push(new Date(datesArray[0]));
      this.dates.push(new Date(datesArray[1]));
    }
    if (params.entitiesConjunctionMode !== undefined) {
      this.entitiesConjunctionMode = JSON.parse(params.entitiesConjunctionMode);
    }
    if (params.keywordsConjunctionMode !== undefined) {
      this.keywordsConjunctionMode = JSON.parse(params.keywordsConjunctionMode);
    }
    if (params.entitiesSearchIncludeArticles !== undefined) {
      this.entitiesSearchIncludeArticles = JSON.parse(params.entitiesSearchIncludeArticles);
    }
    if (params.order !== undefined && params.orderBy !== undefined) {
      this.order = JSON.parse(params.order);
      if (this.order) {
        this.orderBy = params.orderBy;
        if (params.howToOrder !== undefined) {
          this.howToOrder = params.howToOrder;
        }
      }
    }
  }

  public toSPARQL(): string {
    let request = this.setUpPrefixes();
    request = this.setUpNormalResearch(request);
    request += 'LIMIT ' + environment.resultPerPage + ' ';
    request += 'OFFSET ' + this.currentOffset;
    return request;
  }

  private static getStringifiedDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private keywordsConjunctionIsTriggered() {
    return this.keywords && this.keywords.length > 1 && this.keywordsConjunctionMode;
  }

  private entitiesConjunctionIsTriggered() {
    return this.entities && this.entities.length > 1 && this.entitiesConjunctionMode;
  }

  private getRequestCore(): string {
    let request = '';
    for (const clause of Requester.requestData.clauses) {
      request += clause + ' . ';
    }
    if (this.author && this.author.length > 0) {
      request += 'FILTER (';
      for (const author of this.author) {
        request += 'contains (lcase(str(?author)), "' + author.toLowerCase() + '") || ';
      }
      request = request.slice(0, -4); // Delete last ' || '
      request += ') .';
    }
    if (this.dates && this.dates.length === 2) {
      request += 'FILTER (?date >= "'
      + Requester.getStringifiedDate(this.dates[0])
      + '"^^xsd:dateTime && ?date <= "'
      + Requester.getStringifiedDate(this.dates[1]) + '"^^xsd:dateTime) . ';
    }
    if (this.entities && this.entities.length > 0) {
      request += 'OPTIONAL{?item schema:mentions ?mentions_links . ?mentions_links nif:isString ?mentions} .';
      if (this.entitiesSearchIncludeArticles) {
        request += 'OPTIONAL{?claims schema:mentions ?mentions_links_article . ?mentions_links_article nif:isString ?mentions_article} .';
      }
      request += 'FILTER (';
      for (const entity of this.entities) {
        request += '(lcase(str(?mentions)) = "' + entity.toLowerCase() + '") || ';
        if (this.entitiesSearchIncludeArticles) {
          request += '(lcase(str(?mentions_article)) = "' + entity.toLowerCase() + '") || ';
        }
      }
      request = request.slice(0, -4); // Delete last ' || '
      request += ') .';
    }
    if (this.truthRatings && this.truthRatings.length > 0) {
      request += 'FILTER (';
      for (const rating of this.truthRatings) {
        request += '?truthRating = ' + rating + ' || ';
      }
      request = request.slice(0, -4); // Delete last ' || '
      request += ') . ';
    }
    if (this.languages && this.languages.length > 0) {
      request += '?claims schema:inLanguage ?inLanguage .';
      request += '?inLanguage schema:name ?language . ';
      request += 'FILTER (';
      for (const language of this.languages) {
        request += 'lcase(?language) = "' + language.toLowerCase() + '" || ';
      }
      request = request.slice(0, -4); // Delete last ' || '
      request += ') .';
    }
    if (this.sources && this.sources.length > 0) {
      request += '?claims schema:author ?sourceAuthor .';
      request += '?sourceAuthor schema:name ?source . ';
      request += 'FILTER (';
      for (const source of this.sources) {
        request += 'contains(lcase(?source) ,"' + source.toLowerCase() + '") || ';
      }
      request = request.slice(0, -4); // Delete last ' || '
      request += ') .';
    }
    if (this.keywords && this.keywords.length > 0) {
      request += 'OPTIONAL {?item schema:keywords ?keywords} . ';
      request += 'FILTER (';
      for (const word of this.keywords) {
        request += 'contains (lcase(str(?keywords)), "' + word.toLowerCase() + '") ' +
        '|| contains (lcase(str(?text)), "' + word.toLowerCase() + '") ' +
        '|| contains (lcase(str(?headline)), "' + word.toLowerCase() + '") || ';
      }
      request = request.slice(0, -4); // Delete last ' || '
      request += ') .';
    }
    request += '}';
    if (this.superRequestIsTriggered()) {
      request += '}';
      if (this.entitiesConjunctionIsTriggered()) {
        request += 'FILTER (';
        for (const entity of this.entities) {
            request += '(contains (lcase(str(?mentions)), "' + entity.toLowerCase() + '")';
            if (this.entitiesSearchIncludeArticles) {
              request += '|| contains (lcase(str(?mentions_article)), "' + entity.toLowerCase() + '")';
            }
            request += ') && ';
          }
        request = request.slice(0, -4); // Delete last ' && '
        request += ') . ';
      }
      if (this.keywordsConjunctionIsTriggered()) {
        request += 'FILTER (';
        for (const keyword of this.keywords) {
            request += '(contains (lcase(str(?keywords)), "' + keyword.toLowerCase() +
            '") || contains (lcase(str(?text)), "' + keyword.toLowerCase() + '")) && ';
          }
        request = request.slice(0, -4); // Delete last ' && '
        request += ') . ';
      }
      request += '}';
    }
    return request;
  }

  private getNormalSelectCore(): string {
    let request = 'select ' + Requester.requestData.select;
    if (this.entitiesConjunctionIsTriggered()) {
      request += ' group_concat(?mentions, ",") as ?mentions ';
      if (this.entitiesSearchIncludeArticles) {
        request += ' group_concat(?mentions_article, ",") as ?mentions_article ';
      }
    }
    if (this.keywordsConjunctionIsTriggered()) {
      request += ' group_concat(?keywords, ",") as ?keywords ';
    }
    request += ' where { ';

    return request;
  }

  private superRequestIsTriggered() {
    return this.entitiesConjunctionIsTriggered()
    || this.keywordsConjunctionIsTriggered();
  }

  private setUpPrefixes() {
    let request = '';
    for (const prefix of Requester.requestData.prefixes) {
      request += prefix + ' ';
    }
    return request;
  }

  private setUpNormalResearch(request: string) {
    request += 'select * where {';
    if (this.superRequestIsTriggered()) {
      request += 'select ' + Requester.requestData.superSelectConjunction + ' where { {';
      request += this.getNormalSelectCore();
    } else {
      request += 'select distinct ' + Requester.requestData.select + ' where { ';
    }

    request += this.getRequestCore();
    request += 'ORDER BY desc (?date)';
    request += '}';
    return request;
  }

  public toSPARQLExport(fields: string[]): string {
    let request = this.setUpPrefixes();
    request += 'select ';
    if (fields !== null && fields.length > 0) {
      for (const field of fields) {
        request += field + ' ';
      }
    } else {
      request += ' * ';
    }
    request += 'where {{';
    request = this.setUpNormalResearch(request);
    request += '} . ';
    for (const clauseExport of RequestUtils.exportExtraClauses) {
      request += clauseExport + ' . ';
    }
    request += '} GROUP BY ';
    for (const association of RequestUtils.fieldsAssociation) {
      if (association.hasOwnProperty('varName')) {
        request += association.varName + ' ';
      } else {
        request += association.field + ' ';
      }
    }
    return request;
  }

}