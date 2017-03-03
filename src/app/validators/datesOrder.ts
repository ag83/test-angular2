import { FormGroup } from '@angular/forms';
 
export class DatesOrder {
 
    static isValid(group: FormGroup): any {
 
      let created = group.value.createdDate;
      let expire = group.value.expiredDate;
      if (expire) {
        expire.setHours(23,59,59,999);
      }

      
      if (!group.controls['createdDate'] && !group.controls['expiredDate']) {
        return null;
      }

      if (expire > created) {
        return null;
      }

      return {
                isValid: false
            };
    }
 
}