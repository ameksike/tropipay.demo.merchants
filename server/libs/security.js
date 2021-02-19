const sha1 = require('sha1');
const base64 = require('base-64');
const sha256 = require('js-sha256');
const md5 = require('md5');
const { totp } = require('otplib');

/**
 * Security methods
 */
class Security {

    /**
     * @description generate public token based on totp encode
     * @param key String : public code 
     * @param secret String : private code 
     * @return Object : public token to verify
     */
    generateToken(secret, key ) {
		key = key || Date.now();
        return { secret, key, token: this.sign(secret, key, 'md5') };
    }

    /**
     * @description verify public token based on totp encode
     * @param key String : public code 
     * @param secret String : private code 
     * @param token String : public code 
     * @param time Number difference in milliseconds
     * @return Object
    */
    verifyToken(secret, key, token, time) {
		const diff = time ? Math.floor(Date.now() - parseFloat(key)) : 0;
		const spected = this.sign(secret, key, 'md5');
        return { secret, key, token: spected === token, diff, expired: diff>=time };
    }

    /**
     * @description generate public token based on totp encode
     * @param key String : public code 
     * @param secret String : private code 
     * @return String : public token to verify
     */
    generateTokenTime(key, secret) {
        return this.encode(secret + '-' + key, 'totp');
    }

    /**
     * @description verify public token based on totp encode
     * @param key String : public code 
     * @param secret String : private code 
     * @param token String : public code 
     * @return Boolean
    */
    verifyTokenTime(token, key, secret) {
        return this.decode(token, 'totp', { secret: secret + '-' + key }, 'totp');
    }

    /**
     * @description generate key based on sha1 with timestamp
     * @param denomination String 
     * @return String
     */
    generateKey(denomination) {
        denomination = denomination || '-';
        return this.encode(denomination + Date.now(), 'sha1');
    }

    /**
     * @description Generate signature based on {sha256(md5(first) + second)}
     * @param first String
     * @param second String
     * @return String 
     */
    sign(first, second, algorithm) {
        first = first || '*';
        second = second || Date.now();
		algorithm = algorithm || 'sha256';
		let content = '';
		switch(algorithm){
			case 'sha256':
			
				content = this.encode(this.encode(first, 'md5') + second, 'sha256');
				break;
				
			default: 
				content = this.encode(first+'-.-'+second, 'md5');
				break;
		}
        return content;
    }

    /**
     * @description Generate plain String decoded from an algorithm
     * @param data String to decode
     * @param algorithm String [base64 | hash | totp ]
     * @param options Object config options based on selected algorithm
     * @return String 
     */
    decode(data, algorithm, options) {
        algorithm = algorithm || 'base64';
        options = options || {};
        let content = '';
        try {
            switch (algorithm) {
                case 'base64':
                    content = base64.decode(data);
                    break;

                case 'totp':
                    content = totp.verify({ token: data, secret: options.secret });
                    break;

                case 'hash':
                    content = JSON.pase(this.decode(data, options.algorithm));
                    break;

                default:
                    content = data;
                    break;
            }
            return content;
        }
        catch (error) {
            console.log(error);
            return data;
        }
    }

    /**
     * @description Generate String encoded from an algorithm 
     * @param data String to encode
     * @param algorithm String [base64 | sha1 | sha256 | md5 | totp | hash]
     * @param options Object config options based on selected algorithm
     * @return String 
     */
    encode(data, algorithm, options) {
        algorithm = algorithm || 'base64';
        options = options || {};
        let content = '';
        try {
            switch (algorithm) {
                case 'base64':
                    content = base64.encode(data);
                    break;

                case 'sha1':
                    content = sha1(data);
                    break;

                case 'sha256':
                    content = sha256(data);
                    break;

                case 'totp':
                    content = totp.generate(data);
                    break;

                case 'md5':
                    content = md5(data);
                    break;

                case 'hash':
                    content = this.encode(JSON.stringify(data), options.algorithm);
                    break;

                default:
                    content = data;
                    break;
            }
            return content;
        }
        catch (error) {
            console.log(error);
            return data;
        }
    }
}

module.exports = {
    'Security': Security,
    'security': new Security()
}