/**
 * perform action of this or that module
 * @param  {string} options options
 * @param  {string} options.method method
 * @param  {string} options.url    url
 * @param  {json} options.body   body(optional)
 * @return {promise}                response.body.data or throw error
 */
export default function performAction({ ctxCaller, innerAccess, method, url, query, params, headers, body, }: {
    ctxCaller: any;
    innerAccess: any;
    method: any;
    url: any;
    query: any;
    params: any;
    headers: any;
    body: any;
}): Promise<any>;
//# sourceMappingURL=performAction.d.ts.map