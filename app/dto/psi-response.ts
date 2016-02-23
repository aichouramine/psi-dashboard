interface args {
    type: string;
    key: string;
    value: string;
}

export interface PSIResponse {
    kind: string;
    id: string;
    title: string;
    ruleGroups: {
        SPEED: {
            score: number
        }
    },
    pageStats: {
        numberResources: number;
        numberHosts: number;
        totalRequestBytes: string;
        numberStaticResources: number;
        htmlResponseBytes: string;
        cssResponseBytes: string;
        imageResponseBytes: string;
        javascriptResponseBytes: string;
        otherResponseBytes: string;
        numberJsResources: number;
        numberCssResources: number;
    },
    formattedResults: {
        locale: string;
        ruleResults: {
            AdvoidLandingPageRedirects: {
                localizedRuleName: string;
                ruleImpact: number;
                groups: [string],
                summary: {
                    format: string;
                    args: [args]
                }
            },
            LeverageBrowserCaching: {
                
            },
            MainResourceServerResponseTime: {
                
            },
            MinifyCss: {
                
            },
            MinifyHTML: {
                
            },
            MinifyJavaScript: {
                
            },
            MinimizeRenderBlockingResources: {
                
            },
            OptimizeImages: {
                
            },
            PrioritizeVisibleContent: {
                
            }
        }
    },
    version: {
        major: number,
        minor: number
    }
}