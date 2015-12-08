Date.prototype.yyyymmdd = function( isChinese, delimiter) {     
    delimiter = delimiter || '-';                            
    var yyyy = this.getFullYear().toString();                                    
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
    var dd  = this.getDate().toString();    
    if(isChinese){
      var date = yyyy + '年' + (mm[1]?mm:"0"+mm[0]) + '月' + (dd[1]?dd:"0"+dd[0])+'日';
    }else{
      var date = yyyy + delimiter + (mm[1]?mm:"0"+mm[0]) + delimiter + (dd[1]?dd:"0"+dd[0]);                           
    }
    return date
}; 
// 只要年月，用于创建文件夹，将图片以 年月来分成不同的文件夹以便于管理
Date.prototype.yyyymm = function(delimiter) { 
    delimiter = delimiter || '-';                            
    var yyyy = this.getFullYear().toString();                                    
    var mm = (this.getMonth()+1).toString();                                       
    return yyyy + delimiter + (mm[1]?mm:"0"+mm[0]);
}; 
// chat time stamp: 14-9-22 12:20
Date.prototype.yymmddhhmm = function(isChinese,delimiter) {     
    delimiter = delimiter || '-';                           
    var yy = this.getFullYear().toString();                                    
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
    var dd  = this.getDate().toString();  
    var hh  = this.getHours().toString();
    var MM = this.getMinutes().toString();
    if(isChinese){
      return yy + '年' + (mm[1]?mm:"0"+mm[0]) + '月' + (dd[1]?dd:"0"+dd[0])+'日 '+ (hh[1]?hh:"0"+hh[0])+':'+(MM[1]?MM:"0"+MM[0]);
    }
    return yy + delimiter + (mm[1]?mm:"0"+mm[0]) + delimiter + (dd[1]?dd:"0"+dd[0])+' '+ (hh[1]?hh:"0"+hh[0])+':'+(MM[1]?MM:"0"+MM[0]);
}; 


export function yyyymmdd(d,isChinese,delimiter){
    return d? d.yyyymmdd(isChinese,delimiter) : new Date().yyyymmdd(isChinese,delimiter);
};

export function yyyymm(d){
    return d? d.yyyymm() : new Date().yyyymm();
};

export function yymmddhhmm(d,isChinese,delimiter){
    return d? d.yymmddhhmm(isChinese,delimiter) : new Date().yymmddhhmm(isChinese,delimiter);
};