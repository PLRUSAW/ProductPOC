import { useEffect } from "react";
import useScript from './useScript';

export default function Family(){
    //useScript('https://external.productinformation.abb.com/PisAppTrain/current/pis.js');
    useScript('https://external.productinformation.abb.com/PisAppTrain/6_3_0/pis.js');
   
    const PIS = window.PIS;
    const itemsnew = [];
    useEffect(() => {
      const basicCat = {
        "children": [],
        "hitCount": 1,
        "configuratorHitCount": 0,
        "additionalInfo": [
            {
                "type": "AllowPriceList",
                "value": false
            }
        ],
        "hasChildren": false,
        "images": [
            {
                "url": "https://train.cdn.productimages.abb.com/9PAA00000156089_720x540.jpg",
                "thumbnailUrl": "https://train.cdn.productimages.abb.com/9PAA00000156089_195x195.jpg",
                "masterUrl": "https://train.cdn.productimages.abb.com/9PAA00000156089_master.jpg"
            },
            {
                "url": "https://train.cdn.productimages.abb.com/9IBA002197_400x400.jpg",
                "thumbnailUrl": "https://train.cdn.productimages.abb.com/",
                "masterUrl": "https://train.cdn.productimages.abb.com/9IBA002197_master.jpg"
            },
            {
                "url": "https://train.cdn.productimages.abb.com/9IBA024998_400x400.jpg",
                "thumbnailUrl": "https://train.cdn.productimages.abb.com/9IBA024998_195x195.jpg",
                "masterUrl": "https://train.cdn.productimages.abb.com/9IBA024998_master.jpg"
            },
            {
                "url": "https://train.cdn.productimages.abb.com/9IBA003631_720x540.jpg",
                "thumbnailUrl": "https://train.cdn.productimages.abb.com/9IBA003631_195x195.jpg",
                "masterUrl": "https://train.cdn.productimages.abb.com/9IBA003631_master.jpg"
            },
            {
                "url": "https://train.cdn.productimages.abb.com/9IBA000535_720x540.jpg",
                "thumbnailUrl": "https://train.cdn.productimages.abb.com/9IBA000535_195x195.jpg",
                "masterUrl": "https://train.cdn.productimages.abb.com/9IBA000535_master.jpg"
            },
            {
                "url": "https://train.cdn.productimages.abb.com/9IBA007441_720x540.jpg",
                "thumbnailUrl": "https://train.cdn.productimages.abb.com/9IBA007441_195x195.jpg",
                "masterUrl": "https://train.cdn.productimages.abb.com/9IBA007441_master.jpg"
            }
        ],
        "cid": "",
        "name": "See All",
        "nodeLevel": "0",
        "nodeUse": "L0"
    };
    
    const pisInstance = PIS.Products.getInstance();
    const options = pisInstance.getDefaultOptions();
    const urlParams = new URLSearchParams(window.location.search);   
    const cid = urlParams.get('cid');
 
    options.accessToken = "";
    options.application = {
            "appCode": "",
            "langCode": "en",
    };

    options.components.searchToolbar = {
                "displayModesVisible": true ,
                "countVisible": false,
                "sortVisible": true,
                "pageSizesVisible": false,
    };

    options.components.searchCategories = {
        "maxCategoriesVisible": 7,
        "icon":true
    }

    options.components.searchPagination.visiblePages = 6;

    options.components.itemsGrid = {
                "imageSize": "10rem",    
                "itemTemplate":`       
                <div v-if="item.productId !== -1">
                    <div class="d-flex align-items-start justify-content-between" style="min-height:80px;width:100%;">
                        <div>
                        <div style="color:#36f">
                            <strong>{{item.attributes.ProductName.values[0].text}}</strong>
                        </div>
                        <div style="color:#6c757d; font-weight:500; font-size: 0.875em">
                            {{item.productId}}
                        </div>
                        </div>
                        <div class="d-flex justify-content-end">
                        <img
                            v-bind:src="item.images[0].url"
                            style="width:5rem;"
                        /> 
                        </div>                     
                    </div>
                    <hr>
                    <div>
                        <ul>
                        <li>Key Feature 1</li>
                        <li>Key Feature 2</li>
                        <li>Key Feature 3</li>
                        </ul>
                    </div>
                    <hr>
                    <div style="min-height:150px"> {{item.attributes.LongDescription.values[0].text}}</div>
                    <div class="d-flex flex-row justify-content-between" style="margin-top:20px">
                    
                    <button class="btn" style="border: 1px solid gray;border-radius:15px" @click="emit('app:details',item)">See more</button>
                    <button class="btn " @click="emit('app:download',item)">Documents -></button>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-center align-items-center" style="height:100%" v-if="item.productId === -1">
                    <h1>Advertise</h1>
                </div>
                `
            };
    options.components.searchFilters.card =true;
    options.styles.push(
      { url: "/custom.css" }
    );
    

    options.inheritStyles = true;
    options.dataInterceptor = (e) => {
        if (e.type === "Products") {
            // we need to keep the same array ref for child components, so instead of reassigning items we replace array items
            if (e.data.items) {
              console.log("Items Length: " + e.data.items.length);
             
                              const advertiseItem = {...e.data.items[0]};
                advertiseItem.productId = -1;
                const itemsLength = e.data.items.length;
                let advertiseIndexArray = [];
                for(let i=2; i <e.data.items.length; i=i+9){
                    if(i>0){
                        advertiseIndexArray.push(i);
                    }
                }
                console.log(advertiseIndexArray);
                for(let i=0; i<advertiseIndexArray.length; i++){
                    e.data.items.splice(advertiseIndexArray[i], 0, advertiseItem);
                }

                console.log(e.data.items);
            }
        }
        else if (e.type === "Classifications") {
            // we need to keep the same array ref for child components, so instead of reassigning items we replace array items
            if (e.data.items) {
                e.data.items.splice(0, 0, basicCat);
           }
           console.log(e.data.items);
         }
      return Promise.resolve(e)
      };
          const route = {
              "displayMode": "grid",
              "pagination": { page: 1, pageSize: 8 },
              "cid":cid
          }
          pisInstance.on("app:details", (item) => {
              window.location.href = '/detail?p=' + item.productId;
          })
          pisInstance.on("app:download", (item) => {
              window.location.href = '/detail#download?p=' + item.productId;
      })
          pisInstance.init(options, route);
    }, []);

    return (
      <pis-products-instance>
        <div class="d-flex flex-row mt-20">
              <pis-products-loading-indicator>
                  <div style={{width: '24%', float: 'left'}}>
                      <pis-products-search-filters></pis-products-search-filters>
                  </div>
                  <div style={{width: '75%', float: 'right'}}>
                  <pis-products-search-toolbar></pis-products-search-toolbar>

                      <pis-products-grid-view>
                            <pis-products-search-grid></pis-products-search-grid>
                      </pis-products-grid-view>                    
                      <pis-products-search-pagination></pis-products-search-pagination>
                      <pis-products-search-no-results-view>
                          <pis-products-search-no-results></pis-products-search-no-results>
                      </pis-products-search-no-results-view>
                  </div>
              </pis-products-loading-indicator>
        </div>
      </pis-products-instance>      
      );
}