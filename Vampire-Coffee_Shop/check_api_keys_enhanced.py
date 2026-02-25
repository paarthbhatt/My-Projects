import asyncio
import aiohttp
import time
from typing import Dict, List, Tuple


class EnhancedAPIKeyValidator:
    def __init__(self):
        self.results = {}
    
    async def test_synthetic_key(self, api_key: str) -> Tuple[bool, Dict]:
        """
        Test the synthetic.new API key by making a request to their models endpoint
        """
        url = "https://api.synthetic.new/openai/v1/models"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        try:
            start_time = time.time()
            timeout = aiohttp.ClientTimeout(total=10)
            
            async with aiohttp.ClientSession(timeout=timeout) as session:
                async with session.get(url, headers=headers) as response:
                    response_time = time.time() - start_time
                    status_code = response.status
                    
                    if status_code == 200:
                        data = await response.json()
                        model_count = len(data.get('data', []))
                        
                        return True, {
                            "valid": True,
                            "status_code": status_code,
                            "response_time": round(response_time, 3),
                            "model_count": model_count,
                            "message": f"Valid key with access to {model_count} models"
                        }
                    elif status_code == 401:
                        return False, {
                            "valid": False,
                            "status_code": status_code,
                            "response_time": round(response_time, 3),
                            "message": "Invalid API key - unauthorized"
                        }
                    else:
                        return False, {
                            "valid": False,
                            "status_code": status_code,
                            "response_time": round(response_time, 3),
                            "message": f"Unexpected response: {response.reason}"
                        }
        except asyncio.TimeoutError:
            return False, {
                "valid": False,
                "error": "Request timed out",
                "message": "Request timed out after 10 seconds"
            }
        except Exception as e:
            return False, {
                "valid": False,
                "error": str(e),
                "message": f"Connection error: {str(e)}"
            }

    async def test_openrouter_key(self, api_key: str) -> Tuple[bool, Dict]:
        """
        Test the OpenRouter API key by making a request to their models endpoint
        """
        url = "https://openrouter.ai/api/v1/models"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        try:
            start_time = time.time()
            timeout = aiohttp.ClientTimeout(total=10)
            
            async with aiohttp.ClientSession(timeout=timeout) as session:
                async with session.get(url, headers=headers) as response:
                    response_time = time.time() - start_time
                    status_code = response.status
                    
                    if status_code == 200:
                        data = await response.json()
                        model_count = len(data.get('data', []))
                        
                        # Get detailed model information
                        models_info = []
                        for model in data.get('data', [])[:10]:  # Limit to first 10 models
                            model_info = {
                                "id": model.get('id'),
                                "name": model.get('name'),
                                "context_length": model.get('context_length', 'N/A'),
                                "pricing": model.get('pricing', {})
                            }
                            models_info.append(model_info)
                        
                        return True, {
                            "valid": True,
                            "status_code": status_code,
                            "response_time": round(response_time, 3),
                            "model_count": model_count,
                            "models_info": models_info,
                            "message": f"Valid key with access to {model_count} models"
                        }
                    elif status_code == 401:
                        return False, {
                            "valid": False,
                            "status_code": status_code,
                            "response_time": round(response_time, 3),
                            "message": "Invalid API key - unauthorized"
                        }
                    else:
                        return False, {
                            "valid": False,
                            "status_code": status_code,
                            "response_time": round(response_time, 3),
                            "message": f"Unexpected response: {response.reason}"
                        }
        except asyncio.TimeoutError:
            return False, {
                "valid": False,
                "error": "Request timed out",
                "message": "Request timed out after 10 seconds"
            }
        except Exception as e:
            return False, {
                "valid": False,
                "error": str(e),
                "message": f"Connection error: {str(e)}"
            }

    async def test_chat_completion(self, api_key: str, provider: str) -> Dict:
        """
        Test the API key by making a simple chat completion request
        """
        if provider == "synthetic":
            url = "https://api.synthetic.new/openai/v1/chat/completions"
            model = "gpt-3.5-turbo"
        elif provider == "openrouter":
            url = "https://openrouter.ai/api/v1/chat/completions"
            model = "openai/gpt-3.5-turbo"
        else:
            return {"error": "Unknown provider"}
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": model,
            "messages": [
                {"role": "user", "content": "Hello, this is a test to check API key functionality."}
            ],
            "max_tokens": 15
        }
        
        try:
            start_time = time.time()
            timeout = aiohttp.ClientTimeout(total=15)
            
            async with aiohttp.ClientSession(timeout=timeout) as session:
                async with session.post(url, json=payload, headers=headers) as response:
                    response_time = time.time() - start_time
                    status_code = response.status
                    
                    if status_code == 200:
                        data = await response.json()
                        return {
                            "success": True,
                            "status_code": status_code,
                            "response_time": round(response_time, 3),
                            "message": "Chat completion request successful"
                        }
                    elif status_code == 401:
                        return {
                            "success": False,
                            "status_code": status_code,
                            "response_time": round(response_time, 3),
                            "message": "Unauthorized - invalid API key"
                        }
                    elif status_code == 402:
                        return {
                            "success": False,
                            "status_code": status_code,
                            "response_time": round(response_time, 3),
                            "message": "Payment required - valid key but insufficient funds"
                        }
                    elif status_code == 403:
                        return {
                            "success": False,
                            "status_code": status_code,
                            "response_time": round(response_time, 3),
                            "message": "Forbidden - key exists but access denied"
                        }
                    else:
                        return {
                            "success": False,
                            "status_code": status_code,
                            "response_time": round(response_time, 3),
                            "message": f"Request failed with status {status_code}: {response.reason}"
                        }
        except asyncio.TimeoutError:
            return {
                "success": False,
                "error": "Request timed out",
                "message": "Request timed out after 15 seconds"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "message": f"Connection error during chat completion: {str(e)}"
            }
    
    async def get_account_info(self, api_key: str, provider: str) -> Dict:
        """
        Get account information and usage details
        """
        if provider == "synthetic":
            # Synthetic doesn't have a dedicated account endpoint
            url = "https://api.synthetic.new/openai/v1/models"
        elif provider == "openrouter":
            url = "https://openrouter.ai/api/v1/account"
        else:
            return {"error": "Unknown provider"}
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    status_code = response.status
                    
                    if status_code == 200:
                        data = await response.json()
                        if provider == "openrouter":
                            # Extract account information for OpenRouter
                            account_info = {}
                            if 'data' in data:
                                account_data = data['data']
                                account_info['email'] = account_data.get('email', 'N/A')
                                account_info['created_at'] = account_data.get('created_at', 'N/A')
                                account_info['updated_at'] = account_data.get('updated_at', 'N/A')
                                
                                # Check for usage/billing info
                                if 'verification_status' in account_data:
                                    account_info['verified'] = account_data['verification_status']
                                
                            return {
                                "success": True,
                                "status_code": status_code,
                                "account_info": account_info,
                                "message": "Account information retrieved successfully"
                            }
                        else:
                            # For synthetic, just confirm access
                            return {
                                "success": True,
                                "status_code": status_code,
                                "message": "Access confirmed to service"
                            }
                    elif status_code == 401:
                        return {
                            "success": False,
                            "status_code": status_code,
                            "message": "Unauthorized - invalid API key"
                        }
                    else:
                        return {
                            "success": False,
                            "status_code": status_code,
                            "message": f"Request failed with status {status_code}: {response.reason}"
                        }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "message": f"Error retrieving account info: {str(e)}"
            }

    async def validate_all_keys(self, synthetic_key: str, agentrouter_key: str, openrouter_key: str):
        """
        Validate all API keys and return comprehensive results
        """
        print("🔍 Starting API key validation...")
        print("=" * 70)
        
        # Test synthetic key for basic validity
        print(f"\n🧪 Testing Synthetic API key...")
        syn_valid, syn_result = await self.test_synthetic_key(synthetic_key)
        print(f"   Status: {'✅ Valid' if syn_valid else '❌ Invalid'}")
        print(f"   Details: {syn_result['message']}")
        
        # Test agentrouter key for basic validity
        print(f"\n🧪 Testing AgentRouter API key...")
        ar_valid, ar_result = await self.test_openrouter_key(agentrouter_key)
        print(f"   Status: {'✅ Valid' if ar_valid else '❌ Invalid'}")
        print(f"   Details: {ar_result['message']}")
        
        # Test openrouter key for basic validity
        print(f"\n🧪 Testing OpenRouter API key...")
        or_valid, or_result = await self.test_openrouter_key(openrouter_key)
        print(f"   Status: {'✅ Valid' if or_valid else '❌ Invalid'}")
        print(f"   Details: {or_result['message']}")
        
        # If keys are valid, test chat completion
        if syn_valid:
            print(f"\n💬 Testing Synthetic chat completion...")
            syn_chat_result = await self.test_chat_completion(synthetic_key, "synthetic")
            print(f"   Result: {syn_chat_result['message']}")
        
        if ar_valid:
            print(f"\n💬 Testing AgentRouter chat completion...")
            ar_chat_result = await self.test_chat_completion(agentrouter_key, "openrouter")
            print(f"   Result: {ar_chat_result['message']}")
            
            # Show model information for AgentRouter
            if 'models_info' in ar_result:
                print(f"   Available models (first 10):")
                for model in ar_result['models_info']:
                    print(f"     - {model['id']} ({model['name']})")
                    print(f"       Context: {model['context_length']}")
        
        if or_valid:
            print(f"\n💬 Testing OpenRouter chat completion...")
            or_chat_result = await self.test_chat_completion(openrouter_key, "openrouter")
            print(f"   Result: {or_chat_result['message']}")
            
            # Show model information for OpenRouter
            if 'models_info' in or_result:
                print(f"   Available models (first 10):")
                for model in or_result['models_info']:
                    print(f"     - {model['id']} ({model['name']})")
                    print(f"       Context: {model['context_length']}")
        
        # Get usage information for valid keys
        if syn_valid:
            print(f"\n💳 Getting Synthetic usage info...")
            syn_usage_result = await self.get_account_info(synthetic_key, "synthetic")
            print(f"   Result: {syn_usage_result['message']}")
        
        if ar_valid:
            print(f"\n💳 Getting AgentRouter usage info...")
            ar_usage_result = await self.get_account_info(agentrouter_key, "openrouter")
            print(f"   Result: {ar_usage_result['message']}")
            if 'account_info' in ar_usage_result:
                print(f"      Account Info: {ar_usage_result['account_info']}")
        
        if or_valid:
            print(f"\n💳 Getting OpenRouter usage info...")
            or_usage_result = await self.get_account_info(openrouter_key, "openrouter")
            print(f"   Result: {or_usage_result['message']}")
            if 'account_info' in or_usage_result:
                print(f"      Account Info: {or_usage_result['account_info']}")
        
        # Compile final results
        results = {
            "synthetic": {
                "key_prefix": synthetic_key[:8] + "..." if len(synthetic_key) > 8 else synthetic_key,
                "valid": syn_valid,
                "details": syn_result,
                "usage_details": syn_usage_result if syn_valid else None
            },
            "agentrouter": {
                "key_prefix": agentrouter_key[:8] + "..." if len(agentrouter_key) > 8 else agentrouter_key,
                "valid": ar_valid,
                "details": ar_result,
                "usage_details": ar_usage_result if ar_valid else None
            },
            "openrouter": {
                "key_prefix": openrouter_key[:8] + "..." if len(openrouter_key) > 8 else openrouter_key,
                "valid": or_valid,
                "details": or_result,
                "usage_details": or_usage_result if or_valid else None
            }
        }
        
        print("\n" + "=" * 70)
        print("📊 SUMMARY:")
        print(f"   Synthetic.new: {'✅ Valid' if syn_valid else '❌ Invalid'}")
        print(f"   AgentRouter: {'✅ Valid' if ar_valid else '❌ Invalid'}")
        print(f"   OpenRouter: {'✅ Valid' if or_valid else '❌ Invalid'}")
        print("=" * 70)
        
        return results


async def main():
    validator = EnhancedAPIKeyValidator()
    
    # API keys from the request
    synthetic_key = "syn_3631b1b6a1a74a0ad43b6d2b12af6696"
    agentrouter_key = "sk-sQeDXGRDL8XfKP1GwuTTT0OcHzTTaW42IY4cI0WB0YLXMeWE"
    openrouter_key = "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"
    
    print("API Key Validation Tool - Enhanced Version")
    print("Provider 1: synthetic.new")
    print("Provider 2: agentrouter (OpenRouter)")
    print("Provider 3: openrouter")
    print(f"Testing keys:")
    print(f"  - Synthetic: {synthetic_key[:10]}...")
    print(f"  - AgentRouter: {agentrouter_key[:10]}...")
    print(f"  - OpenRouter: {openrouter_key[:10]}...")
    
    results = await validator.validate_all_keys(synthetic_key, agentrouter_key, openrouter_key)
    
    # Print detailed results
    print("\n📋 DETAILED RESULTS:")
    for provider, data in results.items():
        print(f"\n{provider.upper()}:")
        print(f"  Key prefix: {data['key_prefix']}")
        print(f"  Valid: {data['valid']}")
        for key, value in data['details'].items():
            if key != 'models_info':  # Skip models_info as it's already displayed
                print(f"  {key}: {value}")


if __name__ == "__main__":
    asyncio.run(main())