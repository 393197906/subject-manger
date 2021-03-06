/**
 * Created by mr.xie on 2017/7/26.
 */
import axios from 'axios'

class service {
    pres = 'http://localhost/bingdenew/ec/mobile/index.php?m=admin&c=subject&a=';
    // pres = 'index.php?m=admin&c=subject&a=';

    subjcet_list() {
        return new Promise((res, rej) => {
            axios.get(`${this.pres}api_subject_list`).then(({data, status}) => {
                res(data);
            }).catch((err) => {
                // console.log(err);
                rej(err.message);
            })
        });

    }

    find_subjcet(subject_id) {
        return new Promise((res, rej) => {
            axios.get(`${this.pres}api_find_subject&subject_id=${subject_id}`).then(({data}) => {
                res(data);
            }).catch((err) => {
                rej(err.message);
            })
        });
    }

    updata_subject_info({subject_id, subject_name, subject_active, subject_describe, subject_order}) {
        return new Promise((res, rej) => {
            axios.post(`${this.pres}api_update_subject_info`, {
                subject_id,
                subject_name,
                subject_active,
                subject_describe,
                subject_order,
            }).then(({data}) => {
                res(data);
            }).catch((err) => {
                rej(err.message);
            })
        });
    }

    updata_subject_render({subject_id, subject_template}) {
        return new Promise((res, rej) => {
            axios.post(`${this.pres}api_update_subject_render`, {
                subject_id,
                subject_template
            }).then(({data}) => {
                res(data);
            }).catch((err) => {
                rej(err.message);
            })
        });
    }

    add_subject({subject_name}) {
        return new Promise((res, rej) => {
            axios.post(`${this.pres}api_add_subject`, {
                subject_name,
            }).then(({data}) => {
                res(data);
            }).catch((err) => {
                rej(err.message);
            })
        });
    }

    remove_subject({subject_id}) {
        return new Promise((res, rej) => {
            axios.post(`${this.pres}api_remove_subject`, {
                subject_id,
            }).then(({data}) => {
                res(data);
            }).catch((err) => {
                rej(err.message);
            })
        });
    }


}

export default new service();