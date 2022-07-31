Projekat je realizovan u React native sa typescript-m  i sa Mobx storovima.
::: mermaid
 graph TD;
 Store --> Agent
 Agent --> Models 
 Store --> Models
 Layout --> Store
 Layout --> Components
 Layout --> Assets
 Layout --> Models
 Layout --> Features --> Models
 Features --> Assets
 Features --> TypingsCustom
 Features --> Components
 Features --> Common --> Models
 Common --> Components;

click Store "https://dev.azure.com/3MPOS/Ekviti/_wiki/wikis/Mob/248/Store"
click Agent "https://dev.azure.com/3MPOS/Ekviti/_wiki/wikis/Mob/246/Agent"
click Models "https://dev.azure.com/3MPOS/Ekviti/_wiki/wikis/Mob/238/Models"
click Layout "https://dev.azure.com/3MPOS/Ekviti/_wiki/wikis/Mob/250/Layout"
click Components "https://dev.azure.com/3MPOS/Ekviti/_wiki/wikis/Mob/239/Components"
click Assets "https://dev.azure.com/3MPOS/Ekviti/_wiki/wikis/Mob/242/Assets"
click Features "https://dev.azure.com/3MPOS/Ekviti/_wiki/wikis/Mob/244/Features"
click TypingsCustom "https://dev.azure.com/3MPOS/Ekviti/_wiki/wikis/Mob/237/Typing-Custom"
click Common "https://dev.azure.com/3MPOS/Ekviti/_wiki/wikis/Mob/240/Common"
click Components "https://dev.azure.com/3MPOS/Ekviti/_wiki/wikis/Api/189/Domain"
:::


