import asyncio
import aiohttp
import time
from typing import Dict, Tuple


class APIKeyValidator:
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

    async def test_agentrouter_key(self, api_key: str) -> Tuple[bool, Dict]:
        """
        Test the agentrouter API key by making a request to their models endpoint
        """
        url = "https://agentrouter.org/v1/responses"
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

    async def test_chat_completion(self, api_key: str, provider: str) -> Dict:
        """
        Test the API key by making a simple chat completion request
        """
        if provider == "synthetic":
            url = "https://api.synthetic.new/openai/v1/chat/completions"
            # Use a model that is likely to be available on synthetic
            model = "gpt-3.5-turbo"
        elif provider == "agentrouter":
            url = "https://openrouter.ai/api/v1/chat/completions"
            # Use a common model available on OpenRouter
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
    
    async def get_usage_info(self, api_key: str, provider: str) -> Dict:
        """
        Get usage information for the API key if available
        """
        if provider == "synthetic":
            # Synthetic doesn't seem to have a dedicated usage endpoint, so we'll use models endpoint
            url = "https://api.synthetic.new/openai/v1/models"
        elif provider == "agentrouter":
            # OpenRouter doesn't have a direct usage endpoint, so we'll try account endpoint
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
                        if provider == "agentrouter":
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

    async def validate_all_keys(self, synthetic_key: str, agentrouter_key: str):
        """
        Validate both API keys and return comprehensive results
        """
        print("🔍 Starting API key validation...")
        print("=" * 60)
        
        # Test synthetic key for basic validity
        print(f"\n🧪 Testing Synthetic API key...")
        syn_valid, syn_result = await self.test_synthetic_key(synthetic_key)
        print(f"   Status: {'✅ Valid' if syn_valid else '❌ Invalid'}")
        print(f"   Details: {syn_result['message']}")
        
        # Test agentrouter key for basic validity
        print(f"\n🧪 Testing AgentRouter API key...")
        ar_valid, ar_result = await self.test_agentrouter_key(agentrouter_key)
        print(f"   Status: {'✅ Valid' if ar_valid else '❌ Invalid'}")
        print(f"   Details: {ar_result['message']}")
        
        # If keys are valid, test chat completion
        if syn_valid:
            print(f"\n💬 Testing Synthetic chat completion...")
            syn_chat_result = await self.test_chat_completion(synthetic_key, "synthetic")
            print(f"   Result: {syn_chat_result['message']}")
        
        if ar_valid:
            print(f"\n💬 Testing AgentRouter chat completion...")
            ar_chat_result = await self.test_chat_completion(agentrouter_key, "agentrouter")
            print(f"   Result: {ar_chat_result['message']}")
        
        # Compile final results
        results = {
            "synthetic": {
                "key_prefix": synthetic_key[:8] + "..." if len(synthetic_key) > 8 else synthetic_key,
                "valid": syn_valid,
                "details": syn_result
            },
            "agentrouter": {
                "key_prefix": agentrouter_key[:8] + "..." if len(agentrouter_key) > 8 else agentrouter_key,
                "valid": ar_valid,
                "details": ar_result
            }
        }
        
        print("\n" + "=" * 60)
        print("📊 SUMMARY:")
        print(f"   Synthetic.new: {'✅ Valid' if syn_valid else '❌ Invalid'}")
        print(f"   AgentRouter: {'✅ Valid' if ar_valid else '❌ Invalid'}")
        print("=" * 60)
        
        return results


async def main():
    validator = APIKeyValidator()
    
    # API keys from the request
    synthetic_key = "syn_3631b1b6a1a74a0ad43b6d2b12af6696"
    agentrouter_key = "sk-sQeDXGRDL8XfKP1GwuTTT0OcHzTTaW42IY4cI0WB0YLXMeWE"
    
    print("API Key Validation Tool")
    print("Provider 1: synthetic.new")
    print("Provider 2: agentrouter")
    print(f"Testing keys:")
    print(f"  - Synthetic: {synthetic_key[:10]}...")
    print(f"  - AgentRouter: {agentrouter_key[:10]}...")
    
    results = await validator.validate_all_keys(synthetic_key, agentrouter_key)
    
    # Print detailed results
    print("\n📋 DETAILED RESULTS:")
    for provider, data in results.items():
        print(f"\n{provider.upper()}:")
        print(f"  Key prefix: {data['key_prefix']}")
        print(f"  Valid: {data['valid']}")
        for key, value in data['details'].items():
            print(f"  {key}: {value}")


if __name__ == "__main__":
    asyncio.run(main())