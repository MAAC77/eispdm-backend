import { printLogo } from './print-logo'

const DEFAULT_LOGO = `
                                 $@@.
                                  $@@@  @@,
                                   ]@@"g@@@@g
                                   @,@@@@@@@@@
                ,ggg&@@@@@@BNggg,  P@@@@@@@@@@@
            ,g@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@K
          g@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@P   ,
       ,g@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@g
 ,g@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"   g@@@@
$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@P   g@@@@@@@p
]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@PP'  ,g@@@@@@@@@@@p
  ]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@p
    MB@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
     * @"          "PB@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                       "N@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                          %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                            $@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                             %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
               ,ggg           $@@@@@B@@@@@@@@@@@@@@@@@@@@@@P
              @@@@@        g@Np@@@@@ @@@@@@@@@@@@@@@@@R@@@@
              @@@@@@    @g@@@@@@@@@  @@@@@@@@@@@@@@@@@ @@@
              ]@@@@@@@@@@@@@@@@@@P  ]@@@@@@@@@@@@@@@@P $@
               "B@@@@@@@@@@@@@@P   ,@@@@@@@@@@@@@@@@P  P
               "PB@@@@@@@@BPP     g@@@@@@@@@@@P]@@@P
                                ,@@@@B@@@@@@P  @@P
                               ""  ,g@@@@@P  ,@P'
     NestJS Base Backend         ,@@@@@P-   7P
                              ,@@@P-
  `

export function printNestJSLogo(logo = DEFAULT_LOGO) {
  printLogo(logo)
}
